import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedProgressBar = ({
  value,
  max,
  height = 12,
  showPercentage = false,
  showValue = false,
  color = "#007aff",
  backgroundColor = "#e5e5ea",
  gradient = true,
  glow = false,
  pulseOnComplete = true,
  className = "",
  label = "",
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const progress = Math.min((value / max) * 100, 100);

  const spring = useSpring(0, { duration: 1500 });

  useEffect(() => {
    spring.set(progress);
    setIsComplete(progress >= 100);
  }, [spring, progress]);

  // Анимированная ширина
  const animatedWidth = useTransform(spring, [0, 100], ["0%", "100%"]);

  // Градиентные цвета в зависимости от прогресса
  const animatedGradient = useTransform(
    spring,
    [0, 50, 80, 100],
    [
      `linear-gradient(90deg, ${color}20, ${color}60)`,
      `linear-gradient(90deg, ${color}60, ${color}80)`,
      `linear-gradient(90deg, #ff9500, ${color})`,
      `linear-gradient(90deg, #34c759, #007aff)`,
    ]
  );

  // Свечение
  const glowIntensity = useTransform(spring, [0, 100], [0, 15]);
  const boxShadow = useTransform(glowIntensity, (latest) =>
    glow ? `0 0 ${latest}px ${color}40` : "none"
  );

  return (
    <div className={`animated-progress ${className}`}>
      {label && (
        <motion.div
          className="animated-progress__label"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.div>
      )}

      <div className="animated-progress__container">
        <motion.div
          className="animated-progress__track"
          style={{
            height,
            backgroundColor,
            borderRadius: height / 2,
            overflow: "hidden",
            position: "relative",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.1,
          }}
        >
          {/* Основная полоса прогресса */}
          <motion.div
            className="animated-progress__fill"
            style={{
              height: "100%",
              width: animatedWidth,
              background: gradient ? animatedGradient : color,
              boxShadow,
              borderRadius: height / 2,
              position: "relative",
              overflow: "hidden",
            }}
            animate={
              isComplete && pulseOnComplete
                ? {
                    scale: [1, 1.02, 1],
                    opacity: [1, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: isComplete ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            {/* Бегущий блик */}
            <motion.div
              className="animated-progress__shine"
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                borderRadius: height / 2,
              }}
              animate={{
                left: ["100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1,
              }}
            />
          </motion.div>

          {/* Эффект пузырьков при достижении 100% */}
          {isComplete && (
            <motion.div
              className="animated-progress__bubbles"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 4,
                    height: 4,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    opacity: 0.8,
                  }}
                  animate={{
                    y: [-20, -40],
                    x: [Math.random() * 20 - 10, Math.random() * 40 - 20],
                    opacity: [0.8, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Отображение процентов/значений */}
        {(showPercentage || showValue) && (
          <motion.div
            className="animated-progress__text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 8,
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--text-color)",
            }}
          >
            {showValue && `${value}/${max}`}
            {showValue && showPercentage && " • "}
            {showPercentage && `${Math.round(progress)}%`}
          </motion.div>
        )}
      </div>

      {/* Эффект конфетти при достижении цели */}
      {isComplete && (
        <motion.div
          className="animated-progress__celebration"
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            pointerEvents: "none",
          }}
          initial={{ scale: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            y: [-30, -60, -40],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            times: [0, 0.3, 1],
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          🎉
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedProgressBar;
