import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-black via-slate-900 to-zinc-800 text-white overflow-hidden pt-16 pb-8 border-t border-white/10">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-500 rounded-full blur-[180px] opacity-20 pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative"
      >
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide text-purple-400">BERU</h2>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            A futuristic IT asset management system built for visibility, speed and absolute control.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Made with ⚡ by Arjun Nath
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Navigation</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><ScrollLink to="hero" smooth duration={600} offset={-70} className="hover:text-purple-400 cursor-pointer">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth duration={600} offset={-70} className="hover:text-purple-400 cursor-pointer">About</ScrollLink></li>
            <li><ScrollLink to="origin" smooth duration={600} offset={-70} className="hover:text-purple-400 cursor-pointer">Origin</ScrollLink></li>
            <li><ScrollLink to="developer" smooth duration={600} offset={-70} className="hover:text-purple-400 cursor-pointer">Meet the Dev</ScrollLink></li>
            <li><ScrollLink to="contact" smooth duration={600} offset={-70} className="hover:text-purple-400 cursor-pointer">Contact</ScrollLink></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Features</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="hover:text-purple-400">Asset Lifecycle Tracking</li>
            <li className="hover:text-purple-400">Role-based Control</li>
            <li className="hover:text-purple-400">Real-time Status</li>
            <li className="hover:text-purple-400">Dark/Light Mode</li>
            <li className="hover:text-purple-400">Admin Dashboard</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Connect</h3>
          <div className="flex gap-4 text-2xl text-slate-300 mb-4">
            <a href="https://linkedin.com/in/arjunnath99" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/arjun-nath-dev" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition">
              <FaGithub />
            </a>
            <a href="mailto:arjun@beru.ai" className="hover:text-purple-400 transition">
              <FaEnvelope />
            </a>
            <a href="https://instagram.com/arjun.visual" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition">
              <FaInstagram />
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Email us: <span className="text-white">berusupport@gmail.com</span>
          </p>
          <p className="text-xs text-slate-400">
            Call: <span className="text-white">+91-6033184756</span>
          </p>
        </div>
      </motion.div>

      <div className="mt-14 border-t border-white/10 pt-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BERU Technologies Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
