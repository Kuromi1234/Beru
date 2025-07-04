import { motion } from "framer-motion";
import { FaLaptop, FaDesktop } from "react-icons/fa";

const assets = [
  {
    icon: <FaLaptop size={32} />,
    title: "Laptops",
    desc: "Seamlessly manage the lifecycle of every laptop — from issue to return, damage, and replacement."
  },
  {
    icon: <FaDesktop size={32} />,
    title: "Monitors",
    desc: "Track assigned monitors, serial numbers, condition, and availability in one place."
  }
];

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-zinc-800 via-slate-900 to-black text-white px-6 py-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          What We <span className="text-purple-400">Manage</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg text-slate-300 max-w-3xl mx-auto mb-12"
        >
          BERU is tailored to manage IT essentials that matter — no fluff, just clarity. 
          We track what you care about most — efficiently and intelligently.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {assets.map((asset, index) => (
            <motion.div
              key={index}
              className="bg-black/20 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-purple-400 mb-4">{asset.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{asset.title}</h3>
              <p className="text-slate-300 text-sm">{asset.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
