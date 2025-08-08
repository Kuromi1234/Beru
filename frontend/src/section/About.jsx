import { motion } from "framer-motion";
import { FaLaptop, FaDesktop } from "react-icons/fa";
import { MdDesktopWindows } from "react-icons/md";

const assets = [
  {
    icon: <FaLaptop size={30} />,
    title: "Laptops",
    desc: "Seamlessly manage the lifecycle of every laptop — from issue to return, damage, and replacement."
  },
  {
    icon: <FaDesktop size={30} />,
    title: "Monitors",
    desc: "Track assigned monitors, serial numbers, condition, and availability in one place."
  },
  {
    icon: <MdDesktopWindows size={30} />,
    title: "Desktops",
    desc: "Stay on top of high-performance desktop systems and manage inventory down to the last detail."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-900 to-black text-white px-6 py-20 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent"
        >
          What We <span className="text-purple-400">Manage</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-slate-300 max-w-3xl mx-auto mb-12"
        >
          BERU is tailored to manage IT essentials that matter — no fluff, just clarity.
          We track what you care about most — efficiently and intelligently.
        </motion.p>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {assets.map((asset, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <motion.div
                variants={iconVariants}
                className="text-purple-400 mb-4"
              >
                {asset.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-200">
                {asset.title}
              </h3>
              <p className="text-slate-300 text-sm group-hover:text-slate-100 transition-colors duration-200 leading-relaxed">
                {asset.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
