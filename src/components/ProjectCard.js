import { Col } from "react-bootstrap";
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

export const ProjectCard = ({ title, description, githubUrl, demoUrl, imgUrl, index }) => {
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

  return (
    <Col size={12} sm={6} md={4} className="proj-col">
      <div className="proj-card" style={{'--index': index}}>
        <div className="proj-imgbx">
          {imgUrl ? (
            <div className="github-preview-container">
              <img src={require(`../assets/img/${imgUrl}`)} alt={title} className="github-preview-img" />
            </div>
          ) : previewUrl ? (
            <div className="github-preview-container">
              <img src={previewUrl} alt={title} className="github-preview-img" />
            </div>
          ) : null}
          <div className="proj-txtx">
            <h4>{title}</h4>
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