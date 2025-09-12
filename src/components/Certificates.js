import { Container, Row, Col } from "react-bootstrap";
import { CertificateCard } from "./CertificateCard";
import certificatesBg from "../assets/img/certificates-bg.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useOptimizedIntersectionObserver } from '../utils/animationUtils';
import './Certificates.css';

export const Certificates = () => {
  // State to track if certificates should be loaded
  const [shouldLoadCertificates, setShouldLoadCertificates] = useState(false);
  // State to store certificates data
  const [certificates, setCertificates] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize certificates data to prevent unnecessary re-renders
  const certificatesData = useMemo(() => [
    {
      title: "NVIDIA Deep Learning",
      completionDate: "July 2025",
      institute: "NVIDIA",
      imgUrl: "NVIDIA.webp"
    },
    {
      title: "React Development",
      completionDate: "January 2025",
      institute: "Udemy",
      imgUrl: "React Certificate.webp"
    },
    {
      title: "Cyber Security Analyst Job Simulation",
      completionDate: "November 2024",
      institute: "Tata & Forage",
      imgUrl: "CyberSecurity Certificate.webp"
    },
    {
      title: "JavaScript Development",
      completionDate: "November 2024",
      institute: "Udemy",
      imgUrl: "JavaScript Certificate.webp"
    },
    {
      title: "Full Stack Java Development",
      completionDate: "July 2024",
      institute: "Symbiosis",
      imgUrl: "FullStackJava.webp"
    },
    {
      title: "Data Structures Using C Programming",
      completionDate: "May 2024",
      institute: "SWAYAM",
      imgUrl: "DSA Certificate.webp"
    },
    {
      title: "Java Programming Fundamentals",
      completionDate: "April 2024",
      institute: "Infosys Springboard",
      imgUrl: "Infosys Java Course.webp"
    },
    {
      title: "Python Programming & SQL",
      completionDate: "October 2022",
      institute: "ExcelR",
      imgUrl: "Python Certificate.webp"
    },
    {
      title: "Overview of Space Science & Technology For School Students",
      completionDate: "July 2022",
      institute: "ISRO",
      imgUrl: "ISRO Certificate.webp"
    }
  ], []);

  // Optimized function to load certificates data
  const loadCertificates = useCallback(() => {
    setIsLoading(true);
    // Use requestAnimationFrame for smoother loading
    requestAnimationFrame(() => {
      setCertificates(certificatesData);
      setIsLoading(false);
    });
  }, [certificatesData]);

  // Use optimized intersection observer hook to detect when user approaches Certificates section
  const certificatesSectionRef = useOptimizedIntersectionObserver(
    {
      rootMargin: '300px 0px', // Increased margin for earlier loading
      threshold: 0.05 // Lower threshold for faster detection
    },
    (entry) => {
      if (entry.isIntersecting) {
        // User has reached the Certificates section, load certificates
        setShouldLoadCertificates(true);
      }
    }
  );
  
  // Load certificates when shouldLoadCertificates becomes true
  useEffect(() => {
    if (shouldLoadCertificates) {
      loadCertificates();
    }
  }, [shouldLoadCertificates, loadCertificates]);

  // If certificates haven't been loaded yet, show a loading placeholder
  if (!shouldLoadCertificates || isLoading) {
    return (
      <section className="certificate" id="certificates" ref={certificatesSectionRef} style={{ 
        background: `url(${certificatesBg}) center center/cover no-repeat`, 
        backgroundBlendMode: 'overlay',
        willChange: 'opacity',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}>
        <Container>
          <Row>
            <Col size={12}>
              <div className="animate__animated animate__fadeIn">
                <h2>Certificates</h2>
                <p>Loading certificates...</p>
                <div className="certificates-loading-placeholder">
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
    <section className="certificate" id="certificates" ref={certificatesSectionRef} style={{ 
      background: `url(${certificatesBg}) center center/cover no-repeat`, 
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
                <h2>Certificates</h2>
                <p>A collection of professional certifications I've earned, showcasing my commitment to continuous learning and skill development in various technologies and domains.</p>
                <Row className="align-items-center certificates-grid">
                  {
                    certificates.map((certificate, index) => (
                      <LazyLoadComponent key={index} threshold={100} placeholder={<div className="certificate-card-placeholder"></div>}>
                        <CertificateCard
                          key={`certificate-${index}`}
                          index={index}
                          {...certificate}
                        />
                      </LazyLoadComponent>
                    ))
                  }
                </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Certificates;