import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Origin = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 text-white px-6 py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#888",
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 1 },
            number: { value: 50 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold mb-10 z-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Origin of <span className="text-purple-400">BERU</span>
      </motion.h2>

      {/* Chapters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 z-10 max-w-7xl w-full">
        {/* The Chaos */}
        <motion.div
          className="group bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-purple-400 hover:shadow-purple-500/30 shadow-md transition duration-500 cursor-pointer transform-gpu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotateZ: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-purple-300 group-hover:text-purple-400 transition duration-300 mb-2">
            The Chaos
          </h3>
          <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-all duration-300">
            IT departments across units were drowning in spreadsheets, sticky
            notes, and manual asset logs. Devices went missing, no one knew who
            had what, and audits were nightmares.
          </p>
        </motion.div>

        {/* The Realization */}
        <motion.div
          className="group bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-purple-400 hover:shadow-purple-500/30 shadow-md transition duration-500 cursor-pointer transform-gpu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotateZ: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-purple-300 group-hover:text-purple-400 transition duration-300 mb-2">
            The Realization
          </h3>
          <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-all duration-300">
            As System Engineers ourselves, we saw the flaws firsthand. One day,
            we said — "Why not build something that works *our* way?" A system
            that’s smart, sleek, and deadly simple.
          </p>
        </motion.div>

        {/* The Build */}
        <motion.div
          className="group bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:border-purple-400 hover:shadow-purple-500/30 shadow-md transition duration-500 cursor-pointer transform-gpu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotateZ: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-purple-300 group-hover:text-purple-400 transition duration-300 mb-2">
            The Beginning of BERU
          </h3>
          <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-all duration-300">
            BERU was born — A full-stack, AI-powered asset management system
            made for the modern IT warrior. No more confusion, just clarity,
            speed, and control.
          </p>
        </motion.div>
      </div>

      {/* Closing Quote */}
      <motion.p
        className="mt-16 text-center italic text-slate-400 text-lg z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        "Real problems don't wait. So we built BERU — not for someday, but for
        now."
      </motion.p>
    </section>
  );
};

export default Origin;
