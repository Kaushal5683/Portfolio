import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/banner.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Java Backend Developer", "Web Designer", "Full Stack Developer"];
  const period = 200;

  useEffect(() => {
    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    let ticker = setInterval(tick, delta);

    return () => { clearInterval(ticker); };
  }); // Include all relevant dependencies

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center"> 
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Kaushal Gujarathi`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Java Backend Developer", "Web Designer", "Full Stack Developer" ]'><span className="wrap">{text}</span></span></h1>
                <p>Java Backend Developer skilled in designing and implementing scalable, robust backend solutions using Java, Spring Boot, JPA, Hibernate, and SQL</p>
                <p>Experienced in building REST APIs to seamlessly integrate backend and frontend systems. Proficient with Angular and React, and well-versed in tools like Git, GitHub, and Postman.</p>
                <p>Computer Science graduate from Savitribai Phule Pune University.</p>
                <p>Technical Skills:</p>
                <p>Languages: Java, SQL, HTML/CSS, JavaScript, TypeScript, Python, PHP</p>
                <p>Frameworks: Spring Boot, Spring MVC, Hibernate, Angular, React, Tailwind CSS</p>
                <p>Tools: Git, GitHub, VS Code, Eclipse, Postman, STS.</p>
                <p>Database: MySQL, PostgreSQL, MongoDB</p>
                <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
