import LiquidEther from "../components/LiquidEther";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a22] via-[#0e003a] to-[#020005] z-0" />

      {/* Liquid Ether animation */}
      <div className="absolute inset-0 z-10 opacity-90">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Faint blurred BERU background text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute text-[22rem] md:text-[26rem] font-extrabold text-[#A277FF]/20 blur-3xl select-none pointer-events-none z-15"
      >
        BERU
      </motion.h1>

      {/* Foreground Content */}
      <div className="relative z-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-white text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Revolutionizing the Future<br />of Asset Management
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 text-[7rem] md:text-[9rem] font-extrabold text-[#B19EEF] drop-shadow-[0_0_40px_#7A3FFF]"
        >
          BERU
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-4 text-xl text-gray-300"
        >
          Smooth. Smart. Scalable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-[#6b21ff] via-[#a855f7] to-[#c084fc] rounded-2xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_#a855f7] transition-all duration-300"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
