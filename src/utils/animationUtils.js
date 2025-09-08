/**
 * Animation Utilities for Performance Optimization
 * 
 * This file contains utility functions and hooks to optimize animations
 * and transitions throughout the application.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for optimized animations using requestAnimationFrame
 * @param {Function} callback - Animation callback function
 * @param {Array} dependencies - Dependencies array for the effect
 */
export const useAnimationFrame = (callback, dependencies = []) => {
  // Use useRef for mutable variables that won't cause rerenders
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = useCallback(time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]); // Removed spread element from dependencies array
};

/**
 * Custom hook for optimized intersection observer
 * @param {Object} options - IntersectionObserver options
 * @param {Function} callback - Callback function when intersection changes
 */
export const useOptimizedIntersectionObserver = (options = {}, callback) => {
  const targetRef = useRef(null);
  
  useEffect(() => {
    const target = targetRef.current;
    
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    };
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        callback(entry);
      });
    }, defaultOptions);
    
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [callback, options]);
  
  return targetRef;
};

/**
 * Custom hook for smooth scroll with easing
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId, duration = 1000) => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    let rafId = null;
    
    // Use transform for smoother animation when possible
    const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    
    if (supportsScrollBehavior && Math.abs(distance) < 1500) {
      // For shorter distances, use native smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return;
    }
    
    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Enhanced easing function for smoother animation
      // Using cubic bezier approximation for better smoothness
      const ease = t => {
        // Improved easing curve that starts and ends more gradually
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      window.scrollTo({
        top: startPosition + distance * ease(progress),
        behavior: 'auto' // Using auto with our custom easing is smoother than 'smooth'
      });
      
      if (timeElapsed < duration) {
        rafId = requestAnimationFrame(animation);
      }
    };
    
    // Cancel any existing animation before starting a new one
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    // Use requestAnimationFrame for optimal performance
    rafId = requestAnimationFrame(animation);
    
    // Return a cleanup function
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
  
  return { scrollToElement };
};

/**
 * Optimizes CSS transitions by forcing hardware acceleration
 * @param {HTMLElement} element - DOM element to optimize
 */
export const optimizeTransition = (element) => {
  if (!element) return;
  
  // Force hardware acceleration
  element.style.willChange = 'transform';
  element.style.transform = 'translateZ(0)';
  
  // Clean up after transition ends
  const cleanup = () => {
    element.style.willChange = 'auto';
  };
  
  element.addEventListener('transitionend', cleanup, { once: true });
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds to limit
 */
export const throttle = (func, limit = 100) => {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * Preload images for smoother transitions
 * @param {Array} imageSources - Array of image URLs to preload
 */
export const preloadImages = (imageSources = []) => {
  imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * Custom hook for lazy loading images with fade-in effect
 */
export const useLazyImage = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = imgRef.current;
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => setLoaded(true);
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });
    
    const currentImgRef = imgRef.current; // Store ref value to avoid stale ref in cleanup
    
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }
    
    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);
  
  return { imgRef, loaded };
};

/**
 * Custom hook for applying optimized animation class with proper timing
 * @param {boolean} isVisible - Whether the element is visible
 * @param {string} animationClass - CSS animation class to apply
 * @param {number} delay - Delay in milliseconds
 * @returns {string} - The animation class to apply
 */
export const useOptimizedAnimationClass = (isVisible, animationClass, delay = 0) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    if (isVisible && !shouldAnimate) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldAnimate, delay]);
  
  return isVisible && shouldAnimate ? animationClass : '';
};