import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container" style={{ marginTop: '24px' }}>
        <div className="banner">
          <h1>{title}</h1>
          <p>
          TeaGuard Solutions is a cutting-edge platform 
          dedicated to enhancing tea cultivation through 
          advanced disease detection and management. Our 
          team of experts leverages innovative machine 
          learning technologies to provide accurate, reliable, 
          and timely diagnoses. At TeaGuard, we prioritize the 
          health of your tea plants, 
          ensuring optimal yields and sustainable farming 
          practices for a thriving future.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
