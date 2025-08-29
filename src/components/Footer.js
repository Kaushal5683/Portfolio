import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/ksg.webp";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon4 from "../assets/img/git.svg";
export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-wrapper">
          <Row className="align-items-center">
            <Col size={12} sm={6} className="footer-logo-col">
              <a href="/" className="footer-logo-link">
                <img src={logo} alt="/" className="footer-logo" />
              </a>
              <p className="footer-tagline">Building digital experiences that inspire</p>
              <p className="client-priority">Your vision is my mission - clients are the heart of everything I create</p>
            </Col>
            <Col size={12} sm={6} className="text-center text-sm-end">
              <div className="footer-social-icons">
                <a href="https://www.linkedin.com/in/kaushal-gujarathi104/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={navIcon1} alt="LinkedIn" />
                </a>
                <a href="https://www.facebook.com/kaushal.gujaratihi" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={navIcon2} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/kaushalll_01_/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={navIcon3} alt="Instagram" />
                </a>
                <a href="https://github.com/Kaushal5683" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={navIcon4} alt="GitHub" />
                </a>
              </div>
              <p className="copyright">&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  )
}
