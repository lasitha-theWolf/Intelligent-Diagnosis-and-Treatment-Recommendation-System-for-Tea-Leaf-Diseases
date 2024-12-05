import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          At TeaGuard Solutions, we are pioneers in harnessing the power of technology to transform the way tea cultivation is approached. Our mission is to revolutionize the tea industry by providing tea farmers with state-of-the-art disease detection and management tools, backed by cutting-edge machine learning and artificial intelligence.

Our team is a passionate blend of agricultural experts, data scientists, and technology innovators dedicated to improving the quality, health, and sustainability of tea crops worldwide. By combining years of experience in tea farming with advanced technological solutions, we offer farmers a reliable, accurate, and efficient way to monitor the health of their crops, identify diseases early, and implement effective treatment strategies.

We believe that by empowering farmers with actionable insights and promoting proactive disease management, we can ensure healthier, more productive tea fields while supporting the broader goal of sustainable agriculture. At TeaGuard Solutions, we are committed to safeguarding the future of tea cultivation, one healthy leaf at a time.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
