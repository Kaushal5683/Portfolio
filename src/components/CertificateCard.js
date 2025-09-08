import { Col } from "react-bootstrap";
import { FaCertificate } from 'react-icons/fa';
import { useState, useEffect, useRef, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useOptimizedIntersectionObserver } from '../utils/animationUtils';

export const CertificateCard = memo(({ title, completionDate, imgUrl, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Use optimized intersection observer hook instead of manual implementation
  const cardRef = useOptimizedIntersectionObserver(
    { 
      rootMargin: '200px', 
      threshold: 0.05 
    }, 
    (entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }
  );

  // Preload image when in viewport with priority based on index
  useEffect(() => {
    if (isInView && imgUrl) {
      // Small delay based on index to prevent all images loading at once
      const delay = Math.min(index * 50, 300);
      const timer = setTimeout(() => {
        const img = new Image();
        img.src = require(`../assets/img/certificates/${imgUrl}`);
        img.onload = () => setImageLoaded(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, imgUrl, index]);

  return (
    <Col size={12} sm={6} md={4} className="cert-col">
      <div 
        ref={cardRef}
        id={`certificate-card-${index}`} 
        className="cert-card" 
        style={{
          '--index': index,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      >
        <div className="cert-imgbx">
          <div className="certificate-badge">
            <FaCertificate /> Certificate
          </div>
          <div className="certificate-preview-container">
            {isInView && imgUrl ? (
              <LazyLoadImage
                src={require(`../assets/img/certificates/${imgUrl}`)}
                alt={title}
                effect="blur"
                className={`certificate-preview-img ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                wrapperClassName="lazy-load-image-wrapper"
                threshold={50}
                beforeLoad={() => setImageLoaded(false)}
                afterLoad={() => setImageLoaded(true)}
                placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3C/svg%3E"
                style={{
                  willChange: 'transform, opacity',
                  transform: `translateZ(0)`, // Hardware acceleration
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : null}
            {(!imageLoaded || !isInView) && <div className="img-placeholder" />}
          </div>
          <div className="cert-txtx">
            <h5>{title}</h5>
            <span className="completion-date">{completionDate}</span>
          </div>
        </div>
      </div>
    </Col>
  )
})