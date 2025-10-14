import React, { Suspense } from "react";
import Navbar from "../components/navbar";
import Hero from "../section/Hero";
import About from "../section/About";
import Origin from "../section/Origin";
import Contact from "../section/Contact";
import Developer from "../section/Developer";
import Footer from "../section/Footer";
import { Element } from "react-scroll";

const Landing = () => {
  return (
    <div className="relative bg-black text-white overflow-x-hidden">
   
      <Navbar />


      <Element name="hero" className="min-h-screen">
        <Hero />
      </Element>

   
      <Element name="about" className="min-h-screen">
        <About />
      </Element>


      <Element name="origin" className="min-h-screen">
        <Origin />
      </Element>


      <Element name="contact" className="min-h-screen">
        <Contact />
      </Element>


      <Element name="developer" className="min-h-screen">
        <Developer />
      </Element>


      <Footer />
    </div>
  );
};

export default Landing;
