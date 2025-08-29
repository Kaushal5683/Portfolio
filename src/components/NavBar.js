import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/ksg.webp';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import navIcon4 from '../assets/img/git.svg'
import { HashLink } from 'react-router-hash-link';
import 'animate.css';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""} expanded={expanded}>
        <Container>
          <Navbar.Brand href="/" className="animate__animated animate__fadeIn">
            <img src={logo} alt="Kaushal Gujarathi" />
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="animate__animated animate__fadeIn">
            <Nav className="ms-auto">
              <Nav.Link 
                href="#home" 
                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('home'); closeNavbar();}}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="#skills" 
                className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('skills'); closeNavbar();}}
              >
                Skills
              </Nav.Link>
              <Nav.Link 
                href="#projects" 
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('projects'); closeNavbar();}}
              >
                Projects
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/kaushal-gujarathi104/" target="_blank" rel="noopener noreferrer">
                  <img src={navIcon1} alt="LinkedIn" />
                </a>
                <a href="https://www.facebook.com/kaushal.gujaratihi" target="_blank" rel="noopener noreferrer">
                  <img src={navIcon2} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/kaushalll_01_/" target="_blank" rel="noopener noreferrer">
                  <img src={navIcon3} alt="Instagram" />
                </a>
                <a href="https://github.com/Kaushal5683" target="_blank" rel="noopener noreferrer">
                  <img src={navIcon4} alt="GitHub" />
                </a>
              </div>
              <HashLink to='#connect' onClick={closeNavbar}>
                <button className="vvd">
                  <span>Let's Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
