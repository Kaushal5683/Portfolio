import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/ksg.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon4 from "../assets/img/git.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
            <a href="https://www.linkedin.com/in/kaushal-gujarathi104/"><img src={navIcon1} alt="" /></a>
            <a href="https://www.facebook.com/kaushal.gujaratihi"><img src={navIcon2} alt="" /></a>
            <a href="https://www.instagram.com/kaushalll_01_/"><img src={navIcon3} alt="" /></a>
            <a href="https://github.com/Kaushal5683"><img src={navIcon4} alt=""/></a>
            </div>
            <p>@Copyright 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
