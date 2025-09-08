import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/ksg.webp';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import navIcon4 from '../assets/img/git.svg';
import navIcon5 from '../assets/img/whatsapp.svg'
import { HashLink } from 'react-router-hash-link';
import 'animate.css';
import { throttle, useSmoothScroll } from '../utils/animationUtils';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const { scrollToElement } = useSmoothScroll();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(throttle(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, 100), [setScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll])

  const onUpdateActiveLink = useCallback((value) => {
    setActiveLink(value);
  }, []);

  const closeNavbar = useCallback(() => {
    setExpanded(false);
  }, []);

  return (
      <Navbar 
        expand="md" 
        className={scrolled ? "scrolled" : ""} 
        expanded={expanded}
        ref={navbarRef}
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)' // Force GPU acceleration
        }}
      >
        <Container>
          <Navbar.Brand href="/" className="animate__animated animate__fadeIn">
            <img 
              src={logo} 
              alt="Kaushal Gujarathi" 
              style={{ willChange: 'transform' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse 
            id="basic-navbar-nav" 
            className="animate__animated animate__fadeIn"
            style={{ willChange: expanded ? 'transform, opacity' : 'auto' }}
          >
            <Nav className="ms-auto">
              <Nav.Link 
                href="#home" 
                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('home'); closeNavbar();}}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="#technical-skills" 
                className={activeLink === 'technical-skills' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('technical-skills'); closeNavbar();}}
              >
                Technical Skills
              </Nav.Link>
              <Nav.Link 
                href="#experience" 
                className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('experience'); closeNavbar();}}
              >
                Experience
              </Nav.Link>
              <Nav.Link 
                href="#projects" 
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('projects'); closeNavbar();}}
              >
                Projects
              </Nav.Link>
              <Nav.Link 
                href="#certificates" 
                className={activeLink === 'certificates' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('certificates'); closeNavbar();}}
              >
                Certificates
              </Nav.Link>
              <Nav.Link 
                href="#testimonials" 
                className={activeLink === 'testimonials' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('testimonials'); closeNavbar();}}
              >
                Testimonials
              </Nav.Link>
              <Nav.Link 
                href="#connect" 
                className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} 
                onClick={() => {onUpdateActiveLink('connect'); closeNavbar();}}
              >
                Contact
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon" aria-label="Social media links">
                <a href="https://www.linkedin.com/in/kaushal-gujarathi104/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <img src={navIcon1} alt="LinkedIn" />
                </a>
                <a href="https://www.facebook.com/kaushal.gujaratihi" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
                  <img src={navIcon2} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/kaushalll_01_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                  <img src={navIcon3} alt="Instagram" />
                </a>
                <a href="https://github.com/Kaushal5683" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <img src={navIcon4} alt="GitHub" />
                </a>
                <a href="https://wa.me/917218499483" target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp">
                  <img src={navIcon5} alt="WhatsApp" />
                </a>
              </div>
              <HashLink to='#connect' onClick={(e) => {
                e.preventDefault();
                closeNavbar();
                scrollToElement('connect', 800);
              }}>
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
