import React from "react";
import { motion } from "framer-motion";

const cardData = [
  {
    title: "The Chaos",
    content:
      "IT departments across units were drowning in spreadsheets, sticky notes, and manual asset logs. Devices went missing, no one knew who had what, and audits were nightmares.",
  },
  {
    title: "The Realization",
    content:
      "As System Engineers ourselves, we saw the flaws firsthand. One day, we said — 'Why not build something that works *our* way?' A system that’s smart, sleek, and deadly simple.",
  },
  {
    title: "The Beginning of BERU",
    content:
      "BERU was born — A full-stack, AI-powered asset management system made for the modern IT warrior. No more confusion, just clarity, speed, and control.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Origin = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 text-white px-6 py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* ✨ Title */}
      <motion.h2
        className="text-5xl font-extrabold mb-16 z-10 text-center bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Origin of <span className="text-purple-400">BERU</span>
      </motion.h2>


      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cardData.map((item, index) => (
          <motion.div
            key={item.title}
            className="group bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/10 cursor-pointer"
            variants={card}
            whileHover={{ scale: 1.015 }}
          >
            <h3 className="text-2xl font-semibold text-purple-300 group-hover:text-purple-400 transition-colors duration-200 mb-3">
              {item.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-100 transition-colors duration-200">
              {item.content}
            </p>
          </motion.div>
        ))}
      </motion.div>

      
      <motion.p
        className="mt-20 text-center italic text-slate-400 text-lg z-10 bg-white/5 px-6 py-4 rounded-xl border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        "Real problems don't wait. So we built BERU — not for someday, but for now."
      </motion.p>
    </section>
  );
};

export default Origin;
