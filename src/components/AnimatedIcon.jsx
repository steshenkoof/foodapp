import React from "react";
import { motion } from "framer-motion";

const AnimatedIcon = ({
  icon,
  isActive = false,
  animationType = "default",
  size = 28,
  className = "",
}) => {
  // Различные типы анимаций для разных иконок
  const getAnimationVariants = () => {
    switch (animationType) {
      case "bounce":
        return {
          initial: { scale: 1, rotate: 0 },
          hover: {
            scale: 1.1,
            rotate: [0, -10, 10, -5, 5, 0],
            transition: {
              rotate: { duration: 0.6 },
              scale: { duration: 0.2 },
            },
          },
          active: {
            scale: 1.2,
            rotate: [0, 360],
            transition: {
              rotate: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.3 },
            },
          },
        };

      case "pulse":
        return {
          initial: { scale: 1 },
          hover: {
            scale: [1, 1.2, 1],
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          },
          active: {
            scale: [1, 1.3, 1.1],
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        };

      case "wiggle":
        return {
          initial: { rotate: 0 },
          hover: {
            rotate: [0, -15, 15, -10, 10, -5, 5, 0],
            transition: { duration: 0.8 },
          },
          active: {
            rotate: [0, -20, 20, -15, 15, -10, 10, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 1 },
          },
        };

      case "float":
        return {
          initial: { y: 0 },
          hover: {
            y: [-2, 2, -2],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
          active: {
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.6 },
          },
        };

      case "spin":
        return {
          initial: { rotate: 0 },
          hover: {
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" },
          },
          active: {
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
            transition: { duration: 1 },
          },
        };

      default:
        return {
          initial: { scale: 1, rotate: 0 },
          hover: {
            scale: 1.05,
            transition: { duration: 0.2 },
          },
          active: {
            scale: 1.1,
            transition: { duration: 0.3 },
          },
        };
    }
  };

  const variants = getAnimationVariants();

  // Эффект свечения для активной иконки
  const glowVariants = {
    inactive: { opacity: 0, scale: 1 },
    active: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`animated-icon ${className}`}
      style={{ position: "relative" }}
    >
      {/* Эффект свечения */}
      {isActive && (
        <motion.div
          className="icon-glow"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size + 20,
            height: size + 20,
            background:
              "radial-gradient(circle, rgba(0, 122, 255, 0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: -1,
          }}
          variants={glowVariants}
          animate={isActive ? "active" : "inactive"}
        />
      )}

      {/* Основная иконка */}
      <motion.div
        className="icon-wrapper"
        style={{
          fontSize: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
        variants={variants}
        initial="initial"
        whileHover="hover"
        animate={isActive ? "active" : "initial"}
      >
        {/* Эффект частиц для активного состояния */}
        {isActive && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: 2,
                  height: 2,
                  background: "#007aff",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
                animate={{
                  x: [0, Math.cos((i * 60 * Math.PI) / 180) * 25],
                  y: [0, Math.sin((i * 60 * Math.PI) / 180) * 25],
                  opacity: [1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </>
        )}

        {/* Текст иконки */}
        <motion.span
          style={{
            display: "block",
            filter: isActive
              ? "drop-shadow(0 0 8px rgba(0, 122, 255, 0.6))"
              : "none",
          }}
          animate={
            isActive
              ? {
                  textShadow: [
                    "0 0 8px rgba(0, 122, 255, 0.6)",
                    "0 0 16px rgba(0, 122, 255, 0.8)",
                    "0 0 8px rgba(0, 122, 255, 0.6)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default AnimatedIcon;
