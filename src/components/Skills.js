import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.webp";
import colorSharp1 from "../assets/img/color-sharp2.webp";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "skill-bx wow animate__animated animate__fadeIn" : "skill-bx"}>
                  <h2 className="skill-heading">Skills</h2>
                  
                  <div className="skill-section">
                    <h3 className="skill-subheading">Technical Skills</h3>
                    <Carousel 
                      responsive={responsive} 
                      infinite={true} 
                      className="owl-carousel owl-theme skill-slider"
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter1} alt="Backend Development" />
                          <h5>Backend Development</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter2} alt="Java Development" />
                          <h5>Java Development</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter3} alt="Webpage Design" />
                          <h5>Webpage Design</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter1} alt="API Development" />
                          <h5>API Development</h5>
                        </div>
                      </div>
                    </Carousel>
                  </div>
                  
                  <div className="skill-section">
                    <h3 className="skill-subheading">Technical Skills</h3>
                    <Carousel 
                      responsive={responsive} 
                      infinite={true} 
                      className="owl-carousel owl-theme skill-slider"
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter1} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quick Learner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
                          <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quick Learner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter2} alt="Fast Problem Solver" />
                          <h5>Fast Problem Solver</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter3} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active Listener&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
                          <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active Listener&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                        </div>
                      </div>
                      <div className="item">
                        <div className="skill-item">
                          <img src={meter1} alt="Efficient Communication" />
                          <h5>Efficient Communication</h5>
                        </div>
                      </div>
                    </Carousel>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="" />
      <img className="background-image-right" src={colorSharp1} alt="" />
    </section>
  )
}
