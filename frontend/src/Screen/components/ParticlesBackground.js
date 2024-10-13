import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    // Load tsparticles package bundle
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 100,
      },
      color: {
        value: "#ffffff",
      },
      links: {
        enable: true,
        distance: 200,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: {
          min: 4,
          max: 6,
        },
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
    background: {
      color: "#000000",
    },
    fullScreen: {
      enable: true, // Enable full-screen mode
      zIndex: -1,    // Set z-index to place it behind other content
    },
  };

  return (
    <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
  );
};

export default ParticlesBackground;
