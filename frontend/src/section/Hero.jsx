import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure you have the glow effects and custom fonts

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-slate-900 to-zinc-800 text-white overflow-hidden">
      {/* Background Animated Glow Shape */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />

      {/* Hero Content */}
      <motion.h1
        className="text-center text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to the revolutionizing Asset Management System
        <span className="text-purple-400 block mt-2">BERU</span>
      </motion.h1>

      <motion.p
        className="text-slate-300 text-center max-w-2xl mt-6 text-lg sm:text-xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Asset Management System for next-gen enterprises. Smooth. Smart.
        Scalable.
      </motion.p>

      {/* Call to Action Button with Shimmer */}
      <motion.button
        onClick={() => navigate("/register")}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="glassy-shimmer-btn relative mt-10 px-10 py-4 bg-purple-500/20 hover:bg-purple-400/30 text-white font-bold text-lg rounded-2xl shadow-xl backdrop-blur-md overflow-hidden z-10 group"
      >
        <span className=" relative z-10">Get Started</span>
        <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500 animate-glow" />
      </motion.button>

      {/* Parallax Floating Icons or Particles Placeholder */}
      {/* Optional: Add canvas or floating icons here for more cinematic impact */}
    </section>
  );
};

export default Hero;
