import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import './ExperienceEducation.css';
import experienceBg from '../assets/img/experience-bg.svg';

export const ExperienceEducation = () => {
  const experiences = [
    {
      id: 1,
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      period: "April 2025 - Present",
      description: "Delivering custom web solutions for multiple clients across various industries. Specializing in responsive design, modern frameworks, and client-focused development with a 100% satisfaction rate.",
      skills: ["React", "Angular", "Java", "Spring Boot", "Full Stack"]
    },
    {
      id: 2,
      title: "Student Intern",
      company: "Edreamz Technologies (On-Site)",
      period: "Jan 2025 - April 2025",
      description: "Assisted senior developers with debugging to reduce application errors to boost system performance. Developed Shopify applications using Node.js, React.js, and GraphQL to simplify store management.",
      skills: ["Node.js", "React.js", "GraphQL", "Shopify APIs", "Debugging"]
    },
    {
      id: 3,
      title: "Project Intern",
      company: "CodSoft (Remote)",
      period: "Jan 2025 - Feb 2025",
      description: "Implemented a Tic Tac Toe AI using the Minimax algorithm, achieving 100% optimal decision-making. Created a voice assistant AI for real-time weather updates and Wikipedia search, increasing response time by 40%.",
      skills: ["AI", "NLP", "Minimax Algorithm", "Voice Assistant", "Python"]
    },
    {
      id: 4,
      title: "Project Intern",
      company: "CodeAlpha (Remote)",
      period: "Jan 2025 - Jan 2025",
      description: "Created REST APIs using Node.js, Express.js, and MySQL for data handling. Optimized backend logic and SQL queries, reducing data fetch time by roughly 20%.",
      skills: ["Node.js", "Express.js", "MySQL", "REST APIs", "Full Stack"]
    },
  ];

  const education = [
    {
      id: 1,
      degree: "Master of Science (Computer Application)",
      institution: "Symbiosis School for Online & Digital Learning",
      period: "2025 - Present",
      description: "Specialized in Software Engineering with focus on distributed systems and cloud computing.",
      achievements: [],
      current: true
    },
    {
      id: 2,
      degree: "Bachelor of Science (Computer Science)",
      institution: "Sinhgad College Of Science",
      period: "2022 - 2025",
      description: "Comprehensive program covering programming fundamentals, data structures, algorithms, and software development.",
      achievements: ["CGPA: 8.56/10.0", "Percentage : 77.72%" ,"Grade : A+"]
    },
    {
      id: 3,
      degree: "HSC",
      institution: "Sarhad Public School And Junior College",
      period: "2020 - 2022",
      description: "Science and Mathematics focus with Computer Science electives.",
      achievements: ["Pecentage : 64.64%", "Grade : A"]
    },
    {
        id: 4,
        degree: "SSC",
        institution: "Priyadarshini English School",
        period: "2020",
        description: "",
        achievements: ["Percentage : 84.00%", "Grade : A+"]
      }
  ];

  return (
    <section className="experience-education" id="experience" style={{ background: `url(${experienceBg}) center center/cover no-repeat`, backgroundBlendMode: 'overlay' }}>
      <Container>
        <TrackVisibility>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <div className="experience-education-container">
                <div className="experience-education-header">
                  <h2>Experience & Education</h2>
                  <p>My professional journey and academic background</p>
                </div>
                
                <Row className="gy-4">
                  {/* Experience Column */}
                  <Col lg={6}>
                    <div className="timeline-container">
                      <h3 className="timeline-header">Work Experience</h3>
                      <div className="timeline">
                        {experiences.map((exp) => (
                          <TrackVisibility key={exp.id} partialVisibility offset={100}>
                            {({ isVisible }) => (
                              <div className={`timeline-item ${isVisible ? 'animate__animated animate__fadeInUp' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-date">{exp.period}</div>
                                <div className="timeline-content">
                                  <h4>{exp.title}</h4>
                                  <h5>{exp.company}</h5>
                                  <p>{exp.description}</p>
                                  <div className="timeline-skills">
                                    {exp.skills.map((skill, index) => (
                                      <span key={index} className="timeline-skill-tag">{skill}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </TrackVisibility>
                        ))}
                      </div>
                    </div>
                  </Col>
                  
                  {/* Education Column */}
                  <Col lg={6}>
                    <div className="timeline-container">
                      <h3 className="timeline-header">Education</h3>
                      <div className="timeline">
                        {education.map((edu) => (
                          <TrackVisibility key={edu.id} partialVisibility offset={100}>
                            {({ isVisible }) => (
                              <div className={`timeline-item ${isVisible ? 'animate__animated animate__fadeInUp' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-date">{edu.period}</div>
                                <div className="timeline-content">
                                  <h4>{edu.degree}</h4>
                                  <h5>{edu.institution}</h5>
                                  <p>{edu.description}</p>
                                  {edu.achievements.length > 0 && (
                                    <div className="timeline-achievements">
                                      {edu.achievements.map((achievement, index) => (
                                        <span key={index} className="timeline-achievement-item">{achievement}</span>
                                      ))}
                                    </div>
                                  )}
                                  {edu.current && <span className="timeline-current-badge">Current</span>}
                                </div>
                              </div>
                            )}
                          </TrackVisibility>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </TrackVisibility>
      </Container>
    </section>
  )
}