import React from "react";
import Navbar from "../components/navbar";
import Hero from "../section/Hero";
import About from "../section/About";
import Origin from "../section/Origin";
import Contact from "../section/Contact";
import Developer from "../section/Developer";
import Footer from "../section/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Origin />
      <Contact />
      <Developer />
      <Footer />
      
    </div>
  );
};

export default Landing;
