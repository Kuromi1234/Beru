// Origin.jsx or BackgroundParticles.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main); // Loads the full tsparticles bundle
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 60,
          },
          color: {
            value: "#C084FC",
          },
          links: {
            enable: true,
            color: "#A78BFA",
            distance: 120,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
          },
          size: {
            value: { min: 1, max: 4 },
          },
          opacity: {
            value: 0.3,
          },
        },
      }}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticleBackground;
