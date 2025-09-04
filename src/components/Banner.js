import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/banner.webp";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { FiDownload } from 'react-icons/fi';
import resumePDF from "../assets/KaushalGujarathiFullStack.pdf";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { HashLink } from 'react-router-hash-link';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  
  // Memoize the toRotate array to prevent it from changing on every render
  const toRotate = useMemo(() => [
    "Java Backend Developer", 
    "Web Designer", 
    "Full Stack Developer"
  ], []);
  
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
  }, [text, delta, isDeleting, loopNum, period, toRotate]); // toRotate is now memoized

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center"> 
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn animate__slower" : ""}>
                <span className="tagline">Welcome to my Portfolio — Your Vision, My Expertise</span>
                <h1 className="heading-text">
                  <span className="hi-text">Hi! I'm Kaushal Gujarathi</span>
                  <span className="profession">
                    I'm a <span className="txt-rotate" dataperiod="1000" data-rotate='[ "Java Backend Developer", "Web Designer", "Full Stack Developer" ]'>
                      <span className="wrap">{text}</span>
                    </span>
                  </span>
                </h1>
                <div className="banner-description">
                  <p>Java Backend Developer skilled in designing and implementing scalable, robust backend solutions using Java, Spring Boot, JPA, Hibernate, and SQL. Expert in enterprise Java applications and microservices architecture.</p>
                  <p>Experienced in building REST APIs to seamlessly integrate backend and frontend systems. Proficient with Angular and React, and well-versed in tools like Git, GitHub, and Postman. Specializing in high-performance web applications.</p>
                  <p><strong>Your vision is my command - I believe the client is king, and their satisfaction is my highest priority.</strong></p>
                </div>
                
                <div className="banner-buttons">
                  <HashLink to='#connect'>
                    <button className="connect-btn">
                      Let's Connect <ArrowRightCircle size={25} />
                    </button>
                  </HashLink>
                  <a href={resumePDF} download="KaushalGujarathiFullStack.pdf" className="connect-btn">
                    Download Resume <FiDownload size={20} />
                  </a>
                </div>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn animate__slower banner-img-container" : "banner-img-container"}>
                  <img src={headerImg} alt="Kaushal Gujarathi - Java Backend & Full Stack Developer" className="banner-img" loading="eager" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
