import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = "medium",
  text = "Загрузка...",
  showText = true,
  variant = "default",
}) => {
  const sizeClasses = {
    small: { width: 24, height: 24, dotSize: 4 },
    medium: { width: 40, height: 40, dotSize: 6 },
    large: { width: 60, height: 60, dotSize: 8 },
  };

  const currentSize = sizeClasses[size];

  // Анимация для точек
  const dotVariants = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: { scale: 1, opacity: 1 },
  };

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Пульсация для текста
  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (variant === "food") {
    return (
      <div className="loading-spinner food-loading">
        <motion.div
          className="food-container"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {["🍎", "🥕", "🥗", "🍇"].map((emoji, index) => (
            <motion.div
              key={index}
              className="food-item"
              style={{
                position: "absolute",
                transform: `rotate(${index * 90}deg) translateY(-30px)`,
                transformOrigin: "center",
                fontSize: "24px",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {showText && (
          <motion.p
            className="loading-text"
            variants={textVariants}
            animate="animate"
            style={{
              marginTop: "60px",
              fontSize: "16px",
              color: "var(--secondary-text-color)",
              textAlign: "center",
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="loading-spinner pulse-loading">
        <motion.div
          className="pulse-container"
          style={{
            width: currentSize.width,
            height: currentSize.height,
            background:
              "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
            borderRadius: "50%",
            position: "relative",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Внутренние кольца */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${60 + i * 20}%`,
                height: `${60 + i * 20}%`,
                border: "2px solid var(--primary-color)",
                borderRadius: "50%",
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        {showText && (
          <motion.p
            className="loading-text"
            variants={textVariants}
            animate="animate"
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "var(--secondary-text-color)",
              textAlign: "center",
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Стандартный лоадер с точками
  return (
    <div className="loading-spinner">
      <motion.div
        className="spinner-container"
        style={{
          width: currentSize.width,
          height: currentSize.height,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variants={containerVariants}
        animate="animate"
      >
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: currentSize.dotSize,
              height: currentSize.dotSize,
              background: "var(--primary-color)",
              borderRadius: "50%",
              transformOrigin: `0 ${currentSize.width / 2}px`,
              transform: `rotate(${index * 45}deg) translateX(${
                currentSize.width / 2
              }px)`,
            }}
            variants={dotVariants}
            animate="animate"
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {showText && (
        <motion.p
          className="loading-text"
          variants={textVariants}
          animate="animate"
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "var(--secondary-text-color)",
            textAlign: "center",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
