import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Helmet } from 'react-helmet';

// Lazy load non-critical components
const TechnicalSkillsHighlight = lazy(() => import("./components/TechnicalSkillsHighlight").then(module => ({ default: module.TechnicalSkillsHighlight })));
const ExperienceEducation = lazy(() => import("./components/ExperienceEducation").then(module => ({ default: module.ExperienceEducation })));
const Skills = lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Projects = lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Testimonials = lazy(() => import("./components/Testimonials").then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  // Determine the basename based on the current URL
  const isPortfolioPath = window.location.pathname.includes('/Portfolio');
  const basename = isPortfolioPath ? '/Portfolio' : '/';
  
  // SEO optimization - Track page views
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

  // Main app content component
  const MainContent = () => (
    <div className="App">
      <Helmet>
        <link rel="canonical" href={isPortfolioPath ? 
          "https://kaushal5683.github.io/Portfolio/" : 
          "https://kaushal104.netlify.app/"} 
        />
      </Helmet>
      <NavBar />
      <Banner />
      <Suspense fallback={<LoadingFallback />}>
        <TechnicalSkillsHighlight />
        <ExperienceEducation />
        <Projects />
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
