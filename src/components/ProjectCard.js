import { Col } from "react-bootstrap";
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import React from 'react';

export const ProjectCard = ({ title, description, githubUrl, demoUrl, index }) => {
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
  
  // Extract technology keywords from description for SEO
  const getTechKeywords = (desc) => {
    const techKeywords = [
      'Java', 'Spring Boot', 'React', 'Angular', 'Node.js', 'MERN', 'REST API',
      'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python', 'AI', 'Microservices',
      'Full Stack', 'Backend', 'Frontend', 'Web Development', 'Mobile', 'ESP-32'
    ];
    
    const foundKeywords = techKeywords.filter(keyword => 
      desc.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return foundKeywords.join(', ');
  };
  
  const techKeywords = getTechKeywords(description);
  const projectType = title.toLowerCase().includes('commercial') ? 'Commercial Project' : 'Personal Project';

  return (
    <Col size={12} sm={6} md={4} className="proj-col">
      <article className="proj-card" style={{'--index': index}} itemScope itemType="https://schema.org/SoftwareSourceCode">
        <meta itemProp="codeRepository" content={githubUrl || ''} />
        <meta itemProp="programmingLanguage" content={techKeywords} />
        <meta itemProp="author" content="Kaushal Gujarathi" />
        <div className="proj-imgbx">
          {previewUrl ? (
            <div className="github-preview-container">
              <img 
                src={previewUrl} 
                alt={`${title} - ${projectType} by Kaushal Gujarathi featuring ${techKeywords}`} 
                className="github-preview-img" 
                loading="lazy"
                itemProp="image"
              />
            </div>
          ) : null}
          <div className="proj-txtx">
            <h3 itemProp="name">{title}</h3>
            <p itemProp="description">{description}</p>
            <div className="proj-tech-tags" aria-label="Technologies used">
              {techKeywords && <span className="tech-keywords">{techKeywords}</span>}
            </div>
            <div className="proj-links">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link github-link" aria-label={`View ${title} source code on GitHub`}>
                  <BsGithub size={16} /> Code
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link demo-link" aria-label={`View live demo of ${title}`} itemProp="url">
                  <FiExternalLink size={16} /> Live
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Col>
  )
}
