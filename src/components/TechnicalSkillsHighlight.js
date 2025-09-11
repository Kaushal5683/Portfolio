import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import './TechnicalSkillsHighlight.css';

export const TechnicalSkillsHighlight = () => {
  return (
    <section className="technical-skills" id="technical-skills">
      <Container>
        <TrackVisibility>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <div className="skills-highlight-container">
                <div className="skills-highlight-header">
                  <h2>Technical Expertise</h2>
                  <p>Specialized in modern technologies to deliver high-quality solutions</p>
                </div>
                
                <div className="skills-grid" aria-label="Technical skills grid">
                  <Row className="gy-3">
                    <Col xs={6} sm={6} md={6} lg={3}>
                      <div className="skill-category-card">
                        <div className="skill-category-header">
                          <span className="skill-title">Languages</span>
                          <div className="skill-underline"></div>
                        </div>
                        <div className="skill-icons">
                          <div className="skill-icon-wrapper" data-tooltip="Java">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="SQL">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" alt="SQL" title="SQL" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="HTML">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="HTML" title="HTML" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="CSS">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="CSS" title="CSS" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="JavaScript">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="TypeScript">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" title="TypeScript" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="Python">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="PHP">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" title="PHP" />
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={6} sm={6} md={6} lg={3}>
                      <div className="skill-category-card">
                        <div className="skill-category-header">
                          <span className="skill-title">Frameworks</span>
                          <div className="skill-underline"></div>
                        </div>
                        <div className="skill-icons">
                          <div className="skill-icon-wrapper" data-tooltip="Spring Boot">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" title="Spring Boot" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="Hibernate">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" alt="Hibernate" title="Hibernate" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="Angular">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" title="Angular" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="React">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="Tailwind CSS">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" title="Tailwind CSS" />
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={6} sm={6} md={6} lg={3}>
                      <div className="skill-category-card">
                        <div className="skill-category-header">
                          <span className="skill-title">Tools</span>
                          <div className="skill-underline"></div>
                        </div>
                        <div className="skill-icons">
                          <div className="skill-icon-wrapper" data-tooltip="Git">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="GitHub">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" title="GitHub" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="VS Code">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" title="VS Code" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="Eclipse">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg" alt="Eclipse" title="Eclipse" />
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={6} sm={6} md={6} lg={3}>
                      <div className="skill-category-card">
                        <div className="skill-category-header">
                          <span className="skill-title">Database</span>
                          <div className="skill-underline"></div>
                        </div>
                        <div className="skill-icons">
                          <div className="skill-icon-wrapper" data-tooltip="MySQL">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" title="MySQL" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="PostgreSQL">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" title="PostgreSQL" />
                          </div>
                          <div className="skill-icon-wrapper" data-tooltip="MongoDB">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" title="MongoDB" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </TrackVisibility>
      </Container>
    </section>
  );
};