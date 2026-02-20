"use client";

import React, { useRef, useEffect } from "react";

interface CelestialSphereProps {
  hue?: number;
  speed?: number;
  zoom?: number;
  particleSize?: number;
  /** Target frame rate. Default 60. Use 45 on pages with heavy scroll animations. */
  fps?: number;
  className?: string;
}

export const CelestialSphere: React.FC<CelestialSphereProps> = ({
  hue = 260.0,
  speed = 0.3,
  zoom = 1.5,
  particleSize = 3.0,
  fps = 60,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    let animationFrameId: number;
    let idleCbId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any, material: any;

    // Mobile: reduce quality
    const isMobile = window.innerWidth < 768;
    const effectiveZoom = isMobile ? zoom * 1.3 : zoom;
    const effectiveSize = isMobile ? particleSize * 0.7 : particleSize;
    const effectiveSpeed = isMobile ? speed * 0.7 : speed;

    // 4 FBM octaves on all devices — enough visual quality, ~33% less shader cost than 6
    const fbmOctaves = isMobile ? 3 : 4;

    // Frame throttle: mobile = 30fps, desktop respects fps prop
    const effectiveFps = isMobile ? 30 : fps;
    const frameInterval = 1000 / effectiveFps;

    const init = async () => {
      // Lazy-load three — keeps it out of the initial JS bundle
      const THREE = await import("three");

      if (!currentMount) return; // unmounted while loading

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision mediump float;
        varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_hue;
        uniform float u_zoom;
        uniform float u_particle_size;

        vec3 hsl2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
        }
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        float noise(vec2 st) {
          vec2 i = floor(st); vec2 f = fract(st);
          float a = random(i);
          float b = random(i+vec2(1.0,0.0));
          float c = random(i+vec2(0.0,1.0));
          float d = random(i+vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.y*u.x;
        }
        float fbm(vec2 st) {
          float value = 0.0; float amplitude = 0.5;
          for (int i = 0; i < ${fbmOctaves}; i++) {
            value += amplitude * noise(st);
            st *= 2.0; amplitude *= 0.5;
          }
          return value;
        }
        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.y, u_resolution.x);
          uv *= u_zoom;
          vec2 mn = u_mouse / u_resolution;
          uv += (mn - 0.5) * 0.8;
          float f = fbm(uv + vec2(u_time*0.1, u_time*0.05));
          float t = fbm(uv + f + vec2(u_time*0.05, u_time*0.02));
          float nebula = pow(t, 2.0);
          vec3 color = hsl2rgb(vec3(u_hue/360.0 + nebula*0.2, 0.7, 0.5));
          color *= nebula * 2.5;
          float sv = random(vUv * 500.0);
          if (sv > 0.998) color += vec3((sv-0.998)/0.002 * u_particle_size);
          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      currentMount.appendChild(renderer.domElement);

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0.0 },
          u_resolution: { value: new THREE.Vector2() },
          u_mouse: { value: new THREE.Vector2() },
          u_hue: { value: hue },
          u_zoom: { value: effectiveZoom },
          u_particle_size: { value: effectiveSize },
        },
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = currentMount;
        if (!w || !h) return;
        renderer.setSize(w, h);
        material.uniforms.u_resolution.value.set(w, h);
      };
      resize();

      // Frame throttle — always active now, using effectiveFps
      let lastFrame = 0;
      const animate = (timestamp: number) => {
        animationFrameId = requestAnimationFrame(animate);
        if (timestamp - lastFrame < frameInterval) return;
        lastFrame = timestamp;
        material.uniforms.u_time.value += 0.005 * effectiveSpeed;
        renderer.render(scene, camera);
      };
      animationFrameId = requestAnimationFrame(animate);

      const onResize = () => resize();
      const onMouse = (e: MouseEvent) => {
        const rect = currentMount.getBoundingClientRect();
        material.uniforms.u_mouse.value.set(
          e.clientX - rect.left,
          currentMount.clientHeight - (e.clientY - rect.top),
        );
      };
      const onVisibility = () => {
        if (document.hidden) cancelAnimationFrame(animationFrameId);
        else animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMouse);
      document.addEventListener("visibilitychange", onVisibility);

      // Store cleanup refs on the mount div so the outer cleanup can call them
      (currentMount as HTMLDivElement & { _cleanup?: () => void })._cleanup = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        document.removeEventListener("visibilitychange", onVisibility);
        cancelAnimationFrame(animationFrameId);
        if (renderer?.domElement?.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer?.dispose();
      };
    };

    // Defer init until the browser is idle — doesn't block LCP
    if ("requestIdleCallback" in window) {
      idleCbId = requestIdleCallback(() => init(), { timeout: 2000 });
    } else {
      setTimeout(init, 200);
    }

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(idleCbId);
      const m = currentMount as HTMLDivElement & { _cleanup?: () => void };
      m._cleanup?.();
    };
  }, [hue, speed, zoom, particleSize]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      aria-hidden
      style={{ willChange: "transform" }}
      className={`absolute inset-0 w-full h-full pointer-events-none${className ? ` ${className}` : ""}`}
    />
  );
};

export default CelestialSphere;
