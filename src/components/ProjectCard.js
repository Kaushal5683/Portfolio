import { Col } from "react-bootstrap";
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { FaBriefcase } from 'react-icons/fa';
import { useState, useEffect, useRef, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ProjectCard = memo(({ title, description, githubUrl, demoUrl, imgUrl, index, clientProject, client }) => {
  // Extract username and repo name from GitHub URL if available
  const getGitHubPreviewUrl = (url) => {
    if (!url) return null;
    try {
      const parts = url.split('/');
      const username = parts[3];
      const repo = parts[4];
      return `https://opengraph.githubassets.com/1/${username}/${repo}`;
    } catch (error) {
      return null;
    }
  };

  const previewUrl = githubUrl ? getGitHubPreviewUrl(githubUrl) : null;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);
  
  // Optimized lazy loading with Intersection Observer
  useEffect(() => {
    const currentRef = cardRef.current; // Store reference to avoid stale closure in cleanup
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '200px', // Increased margin to load images earlier
        threshold: 0.05 // Lower threshold for faster detection
      }
    );
    
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Preload image when in viewport with priority based on index
  useEffect(() => {
    if (isInView && (imgUrl || previewUrl)) {
      // Small delay based on index to prevent all images loading at once
      const delay = Math.min(index * 50, 300);
      const timer = setTimeout(() => {
        const img = new Image();
        img.src = imgUrl ? require(`../assets/img/${imgUrl}`) : previewUrl;
        img.onload = () => setImageLoaded(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, imgUrl, previewUrl, index]);

  return (
    <Col size={12} sm={6} md={4} className="proj-col">
      <div 
        ref={cardRef}
        id={`project-card-${index}`} 
        className="proj-card" 
        style={{
          '--index': index
        }}
      >
        <div className="proj-imgbx">
          {clientProject && (
            <div className="client-badge">
              <FaBriefcase /> Client Project
            </div>
          )}
          <div className="github-preview-container">
            {isInView && (imgUrl || previewUrl) ? (
              <LazyLoadImage
                src={imgUrl ? require(`../assets/img/${imgUrl}`) : previewUrl}
                alt={title}
                effect="blur"
                className={`github-preview-img ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                wrapperClassName="lazy-load-image-wrapper"
                threshold={50}
                beforeLoad={() => setImageLoaded(false)}
                afterLoad={() => setImageLoaded(true)}
                placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3C/svg%3E"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain' // Using contain to show the full image
                }}
              />
            ) : null}
            {(!imageLoaded || !isInView) && <div className="img-placeholder" />}
          </div>
          <div className="proj-txtx">
            <h5>{title}</h5>
            <span>{description}</span>
            <div className="proj-links">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link github-link" aria-label="View code on GitHub">
                  <BsGithub size={16} /> Code
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link demo-link" aria-label="View live demo">
                  <FiExternalLink size={16} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
})