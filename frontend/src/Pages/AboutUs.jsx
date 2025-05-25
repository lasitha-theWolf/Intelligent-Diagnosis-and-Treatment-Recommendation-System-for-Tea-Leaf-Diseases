import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Team from "../components/Team";

const AboutUs = () => {
  return (
    <>

     
      <Team />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
