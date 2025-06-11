import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  pulse = false,
  className = "",
  ...props
}) => {
  const baseVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 32px rgba(0, 122, 255, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    disabled: {
      scale: 1,
      opacity: 0.6,
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const loadingVariants = {
    loading: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const buttonClass = `animated-btn animated-btn--${variant} animated-btn--${size} ${className}`;

  return (
    <motion.button
      className={buttonClass}
      variants={baseVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : "disabled"}
      whileTap={!disabled ? "tap" : {}}
      animate={pulse && !disabled ? "pulse" : "initial"}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      <motion.div className="animated-btn__content">
        {loading && (
          <motion.div
            className="animated-btn__spinner"
            variants={loadingVariants}
            animate="loading"
          >
            ⭕
          </motion.div>
        )}
        <span className={loading ? "animated-btn__text--loading" : ""}>
          {children}
        </span>
      </motion.div>

      {/* Волновой эффект при нажатии */}
      <motion.div
        className="animated-btn__ripple"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{
          scale: 4,
          opacity: 0,
          transition: { duration: 0.6 },
        }}
      />
    </motion.button>
  );
};

export default AnimatedButton;
