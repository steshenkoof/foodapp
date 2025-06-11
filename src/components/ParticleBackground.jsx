import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParticleBackground = ({
  particleCount = 50,
  colors = ["#007aff", "#34c759", "#af52de", "#ff9500"],
  opacity = 0.6,
  size = { min: 2, max: 6 },
  speed = { min: 20, max: 40 },
  className = "",
}) => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (size.max - size.min) + size.min,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        pulsePhase: Math.random() * Math.PI * 2,
        drift: {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
        },
      }));
      setParticles(newParticles);
    }
  }, [dimensions, particleCount, colors, size]);

  const particleVariants = {
    floating: (particle) => ({
      x: [
        particle.x,
        particle.x + particle.drift.x,
        particle.x - particle.drift.x,
        particle.x,
      ],
      y: [
        particle.y,
        particle.y + particle.drift.y,
        particle.y - particle.drift.y,
        particle.y,
      ],
      rotate: [
        particle.rotation,
        particle.rotation + 360 * particle.rotationSpeed,
      ],
      scale: [1, 1.2, 0.8, 1],
      opacity: [opacity * 0.3, opacity, opacity * 0.5, opacity * 0.3],
      transition: {
        duration: Math.random() * speed.max + speed.min,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5,
      },
    }),
  };

  return (
    <div
      className={`particle-background ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
          }}
          variants={particleVariants}
          animate="floating"
          custom={particle}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
          }}
        />
      ))}

      {/* Дополнительные декоративные элементы */}
      <motion.div
        className="gradient-orb"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="gradient-orb"
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: 150,
          height: 150,
          background:
            "radial-gradient(circle, rgba(52, 199, 89, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="gradient-orb"
        style={{
          position: "absolute",
          top: "40%",
          right: "60%",
          width: 100,
          height: 100,
          background:
            "radial-gradient(circle, rgba(175, 82, 222, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(25px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
