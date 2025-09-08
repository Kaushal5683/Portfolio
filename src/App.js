import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Helmet } from 'react-helmet';
import { preloadImages } from './utils/animationUtils';

// Lazy load non-critical components with optimized chunking and prefetching
const TechnicalSkillsHighlight = lazy(() => {
  const component = import("./components/TechnicalSkillsHighlight")
    .then(module => ({ default: module.TechnicalSkillsHighlight }));
  return component;
});

const ExperienceEducation = lazy(() => {
  const component = import("./components/ExperienceEducation")
    .then(module => ({ default: module.ExperienceEducation }));
  return component;
});

const Skills = lazy(() => {
  const component = import("./components/Skills")
    .then(module => ({ default: module.Skills }));
  return component;
});

const Projects = lazy(() => {
  const component = import("./components/Projects")
    .then(module => ({ default: module.Projects }));
  return component;
});

const Certificates = lazy(() => {
  const component = import("./components/Certificates")
    .then(module => ({ default: module.Certificates }));
  return component;
});

const Testimonials = lazy(() => {
  const component = import("./components/Testimonials")
    .then(module => ({ default: module.Testimonials }));
  return component;
});

const Contact = lazy(() => {
  const component = import("./components/Contact")
    .then(module => ({ default: module.Contact }));
  return component;
});

const Footer = lazy(() => {
  const component = import("./components/Footer")
    .then(module => ({ default: module.Footer }));
  return component;
});

// Enhanced loading fallback component with smooth transitions
const LoadingFallback = () => (
  <div className="loading-spinner-container" style={{ 
    willChange: 'opacity',
    transform: 'translateZ(0)', // Force GPU acceleration
    animation: 'fadeIn 0.3s ease-in-out'
  }}>
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  // State to track if critical resources are loaded
  const [, setCriticalAssetsLoaded] = useState(false);
  
  // Determine the basename based on the current URL
  const isPortfolioPath = window.location.pathname.includes('/Portfolio');
  const basename = isPortfolioPath ? '/Portfolio' : '/';
  
  // Preload critical images to improve initial render performance
  useEffect(() => {
    // List of critical images to preload
    const criticalImages = [
      require('./assets/img/banner.webp'),
      require('./assets/img/ksg.webp')
    ];
    
    // Preload critical images
    preloadImages(criticalImages);
    
    // Mark critical assets as loaded
    setCriticalAssetsLoaded(true);
    
    // Add performance mark for analytics
    if (window.performance) {
      window.performance.mark('critical-assets-loaded');
    }
  }, []);
  
  // SEO optimization - Track page views with optimized handler
  useEffect(() => {
    // Update document title based on hash or path
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      let pageTitle = "Kaushal Gujarathi - Java Backend & Full Stack Developer";
      
      if (hash) {
        // Capitalize first letter of each word in the hash
        const sectionName = hash.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        pageTitle = `${sectionName} | Kaushal Gujarathi Portfolio`;
      }
      
      document.title = pageTitle;
    };

    // Initial call
    handleLocationChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Optimized prefetching for next components
  const prefetchNextComponents = useCallback(() => {
    // Prefetch the next components that will likely be needed
    const prefetchComponent = (importFunc) => {
      importFunc().catch(() => {/* Silently catch errors */});
    };
    
    // Schedule prefetching with requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        prefetchComponent(() => import("./components/TechnicalSkillsHighlight"));
        prefetchComponent(() => import("./components/ExperienceEducation"));
      }, { timeout: 2000 });
    } else {
      // Fallback to setTimeout for browsers that don't support requestIdleCallback
      setTimeout(() => {
        prefetchComponent(() => import("./components/TechnicalSkillsHighlight"));
        prefetchComponent(() => import("./components/ExperienceEducation"));
      }, 1000);
    }
  }, []);
  
  // Trigger prefetching after initial render
  useEffect(() => {
    prefetchNextComponents();
  }, [prefetchNextComponents]);
  
  // Main app content component with optimized rendering
  const MainContent = () => (
    <div className="App" style={{ willChange: 'contents' }}>
      <Helmet>
        <link rel="canonical" href={isPortfolioPath ? 
          "https://kaushal5683.github.io/Portfolio/" : 
          "https://kaushal104.netlify.app/"} 
        />
        <meta name="theme-color" content="#121212" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>
      <NavBar />
      <Banner />
      <Suspense fallback={<LoadingFallback />}>
        <TechnicalSkillsHighlight />
        <ExperienceEducation />
        <Projects />
        <Certificates />
        <Testimonials />
        <Contact />
        <Skills />
        <Footer />
      </Suspense>
    </div>
  );

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Main route */}
        <Route path="/" element={<MainContent />} />
        
        {/* Handle old URLs or alternate paths */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        
        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
