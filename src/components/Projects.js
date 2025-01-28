import { Container, Row, Col, Tab} from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg3 from "../assets/img/timetable-software.png";
import projImg2 from "../assets/img/hq720.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg4 from "../assets/img/image.png";
import projImg1 from "../assets/img/a.jpg";
import projImg5 from "../assets/img/tictactoeai.jpg";
import projImg6 from "../assets/img/2P.jpg";
import projImg7 from "../assets/img/Py.jpg";
import projImg8 from "../assets/img/CH.jpg";
import projImg9 from "../assets/img/E.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "Built with React to showcase projects, skills, and personal branding. Integrated EmailJS for direct emails, cutting deployment complexity and server costs.",
      imgUrl: projImg4,
    },
    {
      title: "Automatic Timetable Generator",
      description: "Engineered the frontend interface with Angular, JavaScript, and Node.js to enhance user interaction and achieve seamless integration with backend services for the Automatic Timetable Generator.",
      imgUrl: projImg3,
    },
    {
      title: "Tic Tac Toe AI Game",
      description: "A 3x3 Tic Tac Toe game powered by the Minimax Algorithm, where the AI makes optimal moves for a challenging gameplay experience.",
      imgUrl: projImg5,
    },
    {
      title: "2 Player Tic Tac Toe Game",
      description: "A full-stack MERN project of a classic Tic Tac Toe game, featuring a 3x3 grid where two players can compete in real-time. The game is responsive, interactive, and ensures smooth gameplay.",
      imgUrl: projImg6,
    },
    {
      title: "Voice Assistant AI",
      description: "A Python-powered AI assistant that provides weather updates and speaks Wikipedia information on request.",
      imgUrl: projImg7,
    },
    {
      title: "Chat Bot AI",
      description: "AI chatbot project is designed to engage users in conversations and learn about Earth through their input. The chatbot dynamically adapts to responses, aiming to expand its knowledge and understanding of the world around us.",
      imgUrl: projImg8,
    },
    {
      title: "Mobile Control Car",
      description: "Engineered a remote-controlled surveillance car with real-time video streaming live at Html webpage ESP-32 Camera Module and Embedded C.",
      imgUrl: projImg2,
    },
    {
      title: "E-Commerce Platform (MERN Stack)",
      description: "Built a responsive e-commerce platform with user authentication, product management, cart, and secure checkout, leveraging the MERN stack for scalability and performance.",
      imgUrl: projImg9,
    },
    {
      title: "Sonar System",
      description: "Designed a sonar system that combines stepper motors for dynamic scanning with an Arduino Uno and ultrasonic sensors to measure distance with an accuracy of less than 50 cm.",
      imgUrl: projImg1,
    },
  ];
  
  return (
    <section className="project" id="projects">
      <Container>
        <Row className="align-items-center">
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Below are the projects made during Bachelor's Degree and Some Personal Projects</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""} >
                    <Tab.Pane eventKey="first">
                      <Row className="align-name-center">
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                      <p></p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt=""></img>
    </section>
  )
}
