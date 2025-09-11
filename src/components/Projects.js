import { Container, Row, Col, Tab} from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projectsBg from "../assets/img/projects-bg.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Projects.css';

export const Projects = () => {
  // State to track if projects should be loaded
  const [shouldLoadProjects, setShouldLoadProjects] = useState(false);
  // State to store projects data
  const [projects, setProjects] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // Reference to the projects section
  const projectsSectionRef = useRef(null);
  // Reference to the observer
  const observerRef = useRef(null);

  // Memoize projects data to prevent unnecessary re-renders
  const projectsData = useMemo(() => [
    // Projects data
        {
          title: "Commercial Enterprises Website",
          description: "Developed a responsive website for Arnav Enterprises, a concrete manufacturing company with 14+ years of experience, using Next.js and TailwindCSS.",
          demoUrl: "https://arnaventerprises.netlify.app/",
          imgUrl: "arnav.webp",
          clientProject: true,
          client: "Arnav Enterprises"
        },
        {
          title: "Commercial Enterprises Website",
          description: "Developed and deployed a modern React.js website for a construction company using Material-UI, featuring dynamic project galleries with image carousels, dark/light theme modes, and responsive design optimized for all devices.",
          demoUrl: "https://gurukrupaenterprise.netlify.app/",
          imgUrl: "gurukrupa.webp",
          clientProject: true,
          client: "Gurukrupa Enterprise"
        },
        {
          title: "Commercial Matrimonial Website",
          description: "Delivered the full project within 4 weeks, independently transferring ownership and ensuring 100% functionality post-deployment. Completed the project independently and transferred ownership after deployment",
          demoUrl: "https://hitechmatrimonials.com/",
          imgUrl: "hitech.webp",
          clientProject: true,
          client: "HiTech Matrimonials"
        },
        {
          title: "Personal Portfolio Website",
          description: "Built with React to showcase projects, skills, and personal branding. Integrated EmailJS for direct emails, cutting deployment complexity and server costs.",
          githubUrl: "https://github.com/Kaushal5683/Portfolio",
          demoUrl: "https://kaushal5683.github.io/Portfolio/"
        },
        {
          title: "Automatic Timetable Generator",
          description: "Engineered the frontend interface with Angular, JavaScript, and Node.js to enhance user interaction and achieve seamless integration with backend services for the Automatic Timetable Generator.",
          githubUrl: "https://github.com/Kaushal5683/FinalTT"
        },
        {
          title: "Tic Tac Toe AI Game",
          description: "A 3x3 Tic Tac Toe game powered by the Minimax Algorithm, where the AI makes optimal moves for a challenging gameplay experience.",
          githubUrl: "https://github.com/Kaushal5683/AI-Projects/tree/main/Ai%20Tic%20Tac%20Toe"
        },
        {
          title: "2 Player Tic Tac Toe Game",
          description: "A full-stack MERN project of a classic Tic Tac Toe game, featuring a 3x3 grid where two players can compete in real-time. The game is responsive, interactive, and ensures smooth gameplay.",
          githubUrl: "https://github.com/Kaushal5683/2-Player-Tic-Tac-Toe"
        },
        {
          title: "Voice Assistant AI",
          description: "A Python-powered AI assistant that provides weather updates and speaks Wikipedia information on request.",
          githubUrl: "https://github.com/Kaushal5683/Voice-Assistant"
        },
        {
          title: "Chat Bot AI",
          description: "AI chatbot project is designed to engage users in conversations and learn about Earth through their input. The chatbot dynamically adapts to responses, aiming to expand its knowledge and understanding of the world around us.",
          githubUrl: "https://github.com/Kaushal5683/AI-Projects/tree/main/Chatbot"
        },
        {
          title: "Mobile Control Car",
          description: "Engineered a remote-controlled surveillance car with real-time video streaming live at Html webpage ESP-32 Camera Module and Embedded C.",
          githubUrl: "https://github.com/Kaushal5683/ESP32CAR"
        },
        {
          title: "E-Commerce Platform (MERN Stack)",
          description: "Built a responsive e-commerce platform with user authentication, product management, cart, and secure checkout, leveraging the MERN stack for scalability and performance.",
          githubUrl: "https://github.com/Kaushal5683/E-Commerce"
        },
        {
          title: "Sonar System",
          description: "Designed a sonar system that combines stepper motors for dynamic scanning with an Arduino Uno and ultrasonic sensors to measure distance with an accuracy of less than 50 cm.",
          githubUrl: "https://github.com/Kaushal5683/Sonar-System"
        },
  ], []);

  // Optimized function to load projects data
  const loadProjects = useCallback(() => {
    setIsLoading(true);
    // Use requestAnimationFrame for smoother loading
    requestAnimationFrame(() => {
      setProjects(projectsData);
      setIsLoading(false);
    });
  }, [projectsData]);

  // Setup intersection observer to detect when user approaches Projects section
  useEffect(() => {
    // Create an observer to detect when user is approaching the Projects section directly
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // User has reached the Projects section, load projects
          setShouldLoadProjects(true);
          // Disconnect the observer once projects are set to load
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        rootMargin: '300px 0px', // Increased margin for earlier loading
        threshold: 0.05 // Lower threshold for faster detection
      }
    );

    // Observe the projects section itself
    if (projectsSectionRef.current) {
      observerRef.current.observe(projectsSectionRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  // Load projects when shouldLoadProjects becomes true
  useEffect(() => {
    if (shouldLoadProjects) {
      loadProjects();
    }
  }, [shouldLoadProjects, loadProjects]);


  // If projects haven't been loaded yet, show a loading placeholder
  if (!shouldLoadProjects || isLoading) {
    return (
      <section className="project" id="projects" ref={projectsSectionRef} style={{ 
        background: `url(${projectsBg}) center center/cover no-repeat`, 
        backgroundBlendMode: 'overlay',
        willChange: 'opacity',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}>
        <Container>
          <Row>
            <Col size={12}>
              <div className="animate__animated animate__fadeIn">
                <h2>Projects</h2>
                <p>Loading amazing projects...</p>
                <div className="projects-loading-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
  
  return (
    <section className="project" id="projects" ref={projectsSectionRef} style={{ 
      background: `url(${projectsBg}) center center/cover no-repeat`, 
      backgroundBlendMode: 'overlay',
      willChange: 'opacity',
      transform: 'translateZ(0)' // Force GPU acceleration
    }}>
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility partialVisibility>
              {({ isVisible }) =>
              <div 
                className={isVisible ? "animate__animated animate__fadeIn": ""}
                style={{ 
                  willChange: isVisible ? 'opacity, transform' : 'auto',
                  transform: 'translateZ(0)' // Force GPU acceleration
                }}>
                <h2>Projects</h2>
                <p>Explore my portfolio of work spanning commercial client projects and personal development initiatives. Each project showcases my commitment to creating responsive, user-friendly, and visually appealing digital experiences.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""} >
                    <Tab.Pane eventKey="first">
                      <Row className="align-name-center projects-grid">
                        {
                          projects.map((project, index) => (
                            <LazyLoadComponent key={index} threshold={100} placeholder={<div className="project-card-placeholder"></div>}>
                              <ProjectCard
                                key={`project-${index}`}
                                index={index}
                                {...project}
                              />
                            </LazyLoadComponent>
                          ))
                        }
                        </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}