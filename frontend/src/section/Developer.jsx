import { motion } from "framer-motion";
import { useRef, useState } from "react";
import devImage from "../assets/dev.jpg";
import "../App.css"; // Include glow, font, particles

const Developer = () => {
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 gap-6 py-20 bg-gradient-to-br from-black via-gray-900 to-zinc-800 relative overflow-hidden"
    >
      {/* Particle Background */}
      

      {/* Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-lg text-left"
      >
        <h2 className="text-5xl font-extrabold text-white mb-4">Meet the Developer</h2>
        <p className="text-slate-300 text-lg mb-4 leading-relaxed">
          I'm <span className="text-purple-400 font-semibold">Arjun Nath</span>, a visionary engineer crafting future-proof enterprise tools. 
          My obsession? Making sleek, scalable digital systems that feel like magic.
        </p>
        <p className="text-slate-400 leading-relaxed">
          BERU was born from chaos—missing laptops, untracked monitors. Now, it’s a sharp, AI-driven IT asset manager built to scale with the enterprise.
        </p>
      </motion.div>

      {/* Developer Card */}
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative group cursor-pointer max-w-md box"
      >
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Image */}
          <motion.img
            src={devImage}
            alt="Arjun Nath"
            className={`w-full h-64 object-cover rounded-2xl transition-opacity `}
          />

          <h3 className="mt-6 text-2xl font-bold text-white">Arjun Nath</h3>
          <p className="text-slate-300 mt-1">System Engineer | Product Builder</p>
          <div className="mt-2 text-slate-400 text-sm px-4">
            Building BERU with a vision for seamless enterprise solutions.
          </div>
        </div>

        {/* Signature */}
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl text-white font-signature glow-signature mt-4 animate-pulse text-center"
        >
          — Arjun Nath
        </motion.h4>
      </motion.div>
    </section>
  );
};

export default Developer;
