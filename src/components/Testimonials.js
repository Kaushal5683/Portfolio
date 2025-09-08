import React, { memo, useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './Testimonials.css';
import testimonialsBg from '../assets/img/testimonials-bg.svg';
import { useOptimizedIntersectionObserver } from '../utils/animationUtils';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dheeraj Butala",
      position: "Director, Arnav Enterprises",
      image: "arnav.webp",
      companyLogo: "arnav.webp", // Add company logo if available
      rating: 5,
      projectType: "Corporate Website",
      text: "Kaushal delivered an exceptional website for our concrete manufacturing business. His attention to detail and understanding of our industry needs was impressive. The website has significantly improved our online presence and customer engagement by 45% in just three months."
    },
    {
      id: 2,
      name: "Nilesh Gandhi & Yashwant Dalvi",
      position: "Director, Gurukrupa Enterprise",
      image: "gurukrupa.webp",
      companyLogo: "gurukrupa.webp", // Add company logo if available
      rating: 5,
      projectType: "Construction Portfolio",
      text: "Working with Kaushal was a pleasure. He created a modern, responsive website for our construction company that perfectly represents our brand. The dynamic project galleries and theme options exceeded our expectations and helped us secure three major contracts."
    },
    {
      id: 3,
      name: "Priya Desai",
      position: "Founder, HiTech Matrimonials",
      image: "hitech.webp",
      companyLogo: "hitech.webp", // Add company logo if available
      rating: 5,
      projectType: "Matrimonial Platform",
      text: "Kaushal completed our matrimonial website ahead of schedule and ensured a smooth transition. His technical expertise and commitment to quality are commendable. We've seen a significant increase in user registrations since launch, with over 5,000 new users in the first month."
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="testimonial-star filled" />
      );
    }
    
    // Add half star if needed
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="testimonial-star filled" />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="testimonial-star" />
      );
    }
    
    return stars;
  };

  // Memoized testimonial item to prevent unnecessary re-renders
  const TestimonialItem = memo(({ testimonial }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <div className="testimonial-item" key={testimonial.id}>
        <div className="testimonial-card-header">
          <div className="testimonial-project-type">{testimonial.projectType}</div>
          <div className="testimonial-rating">
            {renderStars(testimonial.rating)}
          </div>
        </div>
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={4} className="testimonial-image-col">
            <div className="testimonial-image-container">
              <div className="testimonial-image-wrapper">
                {testimonial.image ? (
                  <img 
                    src={require(`../assets/img/${testimonial.image}`)} 
                    alt={testimonial.name} 
                    className={`testimonial-image ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="testimonial-image-placeholder">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>
              {testimonial.companyLogo && (
                <div className="company-logo-badge">
                  <img 
                    src={require(`../assets/img/${testimonial.companyLogo}`)} 
                    alt={`${testimonial.name}'s company`} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <div className="testimonial-content">
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-person-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-position">{testimonial.position}</p>
                </div>
                <a href="#projects" className="view-project-link">
                  View Project <FiArrowRight />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  });

  return (
    <section className="testimonials" id="testimonials" style={{ background: `url(${testimonialsBg}) center center/cover no-repeat`, backgroundBlendMode: 'overlay' }}>
      <Container>
        <TrackVisibility partialVisibility>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <div className="testimonials-container">
                <div className="testimonials-header">
                  <h2>Client Success Stories</h2>
                  <p>Real results from satisfied clients who trusted my expertise</p>
                </div>
                
                <Carousel 
                  responsive={responsive} 
                  infinite={true} 
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  customTransition="all .5s"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                  showDots={true}
                  swipeable={true}
                  draggable={true}
                  ssr={true} // means to render carousel on server-side
                  partialVisible={false}
                >
                  {testimonials.map((testimonial) => (
                    <TestimonialItem 
                      key={testimonial.id} 
                      testimonial={testimonial} 
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </TrackVisibility>
      </Container>
    </section>
  );
};