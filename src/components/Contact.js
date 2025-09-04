import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/mail.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';
import { FiSend, FiDownload, FiPhone } from 'react-icons/fi';
import resumePDF from "../assets/KaushalGujarathiFullStack.pdf";

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    
    // Validate form before submission
    if (!formDetails.firstName || !formDetails.email || !formDetails.message) {
      setStatus({ success: false, message: 'Please fill in all required fields.' });
      setButtonText("Send");
      return;
    }

    // Prepare email parameters
    const templateParams = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      email: formDetails.email,
      phone: formDetails.phone,
      message: formDetails.message,
    };

    try {
      // Add a small delay to prevent UI freezing during submission
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await emailjs.send('service_hyg3qse', 'template_872kmo9', templateParams, 'IFz-Ot4BAJQ3XzunH');
      console.log('Email sent successfully!', response.status, response.text);
      setStatus({ success: true, message: 'Message sent successfully!' });
      
      // Clear form after successful submission
      setFormDetails(formInitialDetails);
    } catch (error) {
      console.error('Failed to send email. Error:', error);
      setStatus({ 
        success: false, 
        message: 'Something went wrong, please try again later.'
      });
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <div className="contact-wrapper">
          <Row className="align-items-center">
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className="contact-img-container">
                    <img 
                      className={isVisible ? "animate__animated animate__zoomIn contact-img" : "contact-img"} 
                      src={contactImg} 
                      alt="Contact Us" 
                    />
                  </div>
                }
              </TrackVisibility>
            </Col>
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn contact-form-container" : "contact-form-container"}>
                    <h2 className="contact-heading">Get In Touch</h2>
                    <p className="contact-subheading">Your needs are my top priority. As they say, "Client is God" - I'm here to turn your vision into reality. Please share your thoughts!</p>
                    <div className="contact-actions">
                      <div className="direct-contact-info">
                        <FiPhone className="contact-icon" /> <a href="tel:+917218499483">+91 7218499483</a>
                      </div>
                      <a href={resumePDF} download="KaushalGujarathiFullStack.pdf" className="resume-download-link">
                        <FiDownload className="contact-icon" /> Download Resume
                      </a>
                    </div>
                    <form onSubmit={handleSubmit} className="contact-form">
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formDetails.firstName} 
                              placeholder="First Name" 
                              onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                              required 
                            />
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formDetails.lastName} 
                              placeholder="Last Name" 
                              onChange={(e) => onFormUpdate('lastName', e.target.value)} 
                              required 
                            />
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <div className="form-group">
                            <input 
                              type="email" 
                              className="form-control" 
                              value={formDetails.email} 
                              placeholder="Email Address" 
                              onChange={(e) => onFormUpdate('email', e.target.value)} 
                              required 
                            />
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <div className="form-group">
                            <input 
                              type="tel" 
                              className="form-control" 
                              value={formDetails.phone} 
                              placeholder="Phone No." 
                              onChange={(e) => onFormUpdate('phone', e.target.value)} 
                              required 
                            />
                          </div>
                        </Col>
                        <Col size={12} className="px-1">
                          <div className="form-group">
                            <textarea 
                              rows="6" 
                              className="form-control" 
                              value={formDetails.message} 
                              placeholder="Message" 
                              onChange={(e) => onFormUpdate('message', e.target.value)} 
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="contact-submit-btn">
                            <span>{buttonText}</span>
                            <FiSend className="send-icon" />
                            <span className="priority-text">Your request is my command</span>
                          </button>
                        </Col>
                        {
                          status.message &&
                          <Col>
                            <div className={status.success === false ? "message-alert danger" : "message-alert success"}>
                              {status.message}
                            </div>
                          </Col>
                        }
                      </Row>
                    </form>
                  </div>
                }
              </TrackVisibility>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}
