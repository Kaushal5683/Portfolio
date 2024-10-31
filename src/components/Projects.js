import { Container, Row, Col, Tab} from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg3 from "../assets/img/timetable-software.png";
import projImg2 from "../assets/img/hq720.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from "../assets/img/a.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      title: "Mobile Control Car",
      description: "Engineered a remote-controlled surveillance car with real-time video streaming live at Html webpage ESP-32 Camera Module and Embedded C.",
      imgUrl: projImg2,
    },
    {
      title: "Automatic Timetable Generator",
      description: "Engineering the frontend interface with Angular, JavaScript, and Node.js to enhance user interaction and achieve seamless integration with backend services for the Automatic Timetable Generator.",
      imgUrl: projImg3,
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
                <p>Below Are the projects done during Bachelor's Degree</p>
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
