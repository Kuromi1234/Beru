import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "About", "Origin", "Developer", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-black/30 backdrop-blur-md shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className="text-white text-2xl font-extrabold tracking-widest cursor-pointer transition">
          BERU
        </h1>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{
                scale: 1.08,
                y: -2,
                color: "#C084FC", // soft purple
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className="cursor-pointer transition-colors duration-300 hover:text-purple-400"
            >
              {link}
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden z-[999] cursor-pointer flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 w-full bg-black/80 backdrop-blur-lg px-8 py-6 flex flex-col gap-4"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase()}`}
                className="text-white text-lg font-semibold hover:text-purple-400"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
