import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/ksg.webp';
import { HashLink } from 'react-router-hash-link';
import 'animate.css';
import { throttle, useSmoothScroll } from '../utils/animationUtils';
import { SocialMediaButtons } from './SocialMediaButtons';
import './NavBar.css';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const { scrollToElement } = useSmoothScroll();

  // Optimized scroll handler with improved throttling for better performance
  const handleScroll = useCallback(() => {
    const onScroll = () => {
      // Use requestAnimationFrame for smoother state updates
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          if (!scrolled) setScrolled(true);
        } else {
          if (scrolled) setScrolled(false);
        }
      });
    };
    // More aggressive throttling for better performance
    return throttle(onScroll, 50);
  }, [scrolled])();

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
              <SocialMediaButtons />
              <HashLink to='#connect' onClick={(e) => {
                e.preventDefault();
                closeNavbar();
                scrollToElement('connect', 800);
              }}>
                <button className="connect-btn">
                  <span>Let's Connect</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
