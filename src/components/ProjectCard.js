import { Col } from "react-bootstrap";
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { FaBriefcase } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export const ProjectCard = ({ title, description, githubUrl, demoUrl, imgUrl, index, clientProject, client }) => {
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
  
  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Start loading when 10% of the element is visible
    );
    
    const currentCard = document.getElementById(`project-card-${index}`);
    if (currentCard) observer.observe(currentCard);
    
    return () => {
      if (currentCard) observer.unobserve(currentCard);
    };
  }, [index]);

  return (
    <Col size={12} sm={6} md={4} className="proj-col">
      <div id={`project-card-${index}`} className="proj-card" style={{'--index': index}}>
        <div className="proj-imgbx">
          {clientProject && (
            <div className="client-badge">
              <FaBriefcase /> Client Project
            </div>
          )}
          {clientProject && (
            <div className="client-badge">
              <FaBriefcase /> Client Project
            </div>
          )}
          {imgUrl ? (
            <div className="github-preview-container">
              {isInView && (
                <img 
                  src={require(`../assets/img/${imgUrl}`)} 
                  alt={title} 
                  className={`github-preview-img ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              )}
              {!imageLoaded && <div className="img-placeholder" />}
            </div>
          ) : previewUrl && isInView ? (
            <div className="github-preview-container">
              <img 
                src={previewUrl} 
                alt={title} 
                className={`github-preview-img ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && <div className="img-placeholder" />}
            </div>
          ) : (
            <div className="github-preview-container">
              <div className="img-placeholder" />
            </div>
          )}
          <div className="proj-txtx">
            <h5>{title}</h5>
            <span>{description}</span>
            <div className="proj-links">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link github-link">
                  <BsGithub size={16} /> Code
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link demo-link">
                  <FiExternalLink size={16} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}