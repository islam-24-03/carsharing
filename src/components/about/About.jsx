import React from "react";
import './style.css';

const About = () => {
   return (
      <main className="MainContent" id="about">
         <section className="about-section container">
            <div className="about-content">
               <h2 className="about-title">
                  <span className="title-highlight">About</span> II Rental Auto
               </h2>
               <div className="about-grid">
                  <div className="about-text">
                     <p className="about-paragraph">
                        II Rental Auto is your trusted car rental service providing a wide range
                        of vehicles to suit every need and budget. Whether you're traveling for
                        business or pleasure, we've got the perfect car for you.
                     </p>
                     <p className="about-paragraph">
                        Our mission is to offer convenient, affordable, and reliable car rentals.
                        Customer satisfaction is our top priority, and we are committed to
                        delivering the best rental experience.
                     </p>
                  </div>
                  <div className="about-features">
                     <div className="feature-item">
                        <div className="feature-icon">🚗</div>
                        <span>Wide vehicle selection</span>
                     </div>
                     <div className="feature-item">
                        <div className="feature-icon">💰</div>
                        <span>Competitive prices</span>
                     </div>
                     <div className="feature-item">
                        <div className="feature-icon">⭐</div>
                        <span>Premium service</span>
                     </div>
                     <div className="feature-item">
                        <div className="feature-icon">📞</div>
                        <span>24/7 support</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
};

export default About;