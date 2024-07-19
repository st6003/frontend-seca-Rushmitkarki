import React from "react";
import Aboutus from"./About.css"

const About = () => {
  return (
    <>
      
      <div className="about-us">
      <section className="hero">
        <div className="hero-content">
          <h1>Remove the guesswork when it comes to your Health</h1>
          <p>Enhance your mental and physical well-being with Memory Guardian's data-driven health assessments and personalized care plans.</p>
          <button className="cta-button">Learn More</button>
        </div>
        <div className="hero-image">
        <img src="assets/images/doctor2.jpg" alt="Doctor" />
        </div>
      </section>

      <section className="introduction">
        <h2>You Deserve Better Healthcare</h2>
        <p>
          Hello, I'm Dr. Johnson, lead developer of Memory Guardian. As a board-certified physician 
          specializing in cognitive health, I've combined advanced technology with medical expertise 
          to create a platform that offers personalized, data-driven healthcare solutions.
        </p>
        <a href="#" className="learn-more">How it Works</a>
      </section>

      <section className="feature">
        <div className="feature-image">
        <img src="assets/images/sideimage4.png" alt="Doctor" />
        
        </div>
        <div className="feature-content">
          <h2>Measure to Manage</h2>
          <p>
            At Memory Guardian, we believe in the power of data. Our app helps you track and 
            understand your health metrics, enabling better management of your overall well-being.
          </p>
        </div>
      </section>
    </div>
      
    </>
  );
};

export default About;
