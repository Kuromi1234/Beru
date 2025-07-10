import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Origin", path: "#Origin" },
  { name: "Developer", path: "#Developer" },
  { name: "Contact", path: "#Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-black/30 backdrop-blur-md shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-extrabold tracking-widest"
        >
          BERU
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-white font-medium items-center">
          {navLinks.map(({ name, path }, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.08, y: -2, color: "#C084FC" }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="cursor-pointer transition-colors duration-300 hover:text-purple-400"
            >
              <a href={path}>{name}</a>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ scale: 1.08, y: -2, color: "#C084FC" }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <Link
              to="/login"
              className="px-4 py-2 bg-purple-500/20 border border-purple-400 text-white rounded-xl hover:bg-purple-500/40 transition"
            >
              Login
            </Link>
          </motion.li>
          <p>/</p>
          <motion.li
            whileHover={{ scale: 1.08, y: -2, color: "#C084FC" }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <Link
              to="/register"
              className="px-4 py-2 bg-purple-500/20 border border-purple-400 text-white rounded-xl hover:bg-purple-500/40 transition"
            >
              Signup
            </Link>
          </motion.li>
        </ul>

        {/* Hamburger for mobile */}
        <div
          className="md:hidden z-[999] cursor-pointer flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
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
            className="md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-lg px-8 py-6 flex flex-col gap-4"
          >
            {navLinks.map(({ name, path }, i) => (
              <Link
                key={i}
                to={path}
                onClick={() => setIsOpen(false)}
                className="text-white text-lg font-semibold hover:text-purple-400 transition"
              >
                {name}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-purple-300 font-semibold border-t border-white/20 pt-4 mt-4"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
