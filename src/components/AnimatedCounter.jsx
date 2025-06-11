import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = ({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  colorThresholds = null, // { low: 50, medium: 80, colors: ['#34c759', '#ff9500', '#ff3b30'] }
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { duration });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.onChange((latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  // Определение цвета на основе значения
  const getColor = (val) => {
    if (!colorThresholds) return "var(--text-color)";

    const { low, medium, colors } = colorThresholds;
    const percentage = (val / value) * 100;

    if (percentage <= low) return colors[0]; // green
    if (percentage <= medium) return colors[1]; // orange
    return colors[2]; // red
  };

  const animatedColor = useTransform(
    spring,
    [0, value * 0.5, value * 0.8, value],
    colorThresholds
      ? ["#34c759", "#34c759", "#ff9500", "#ff3b30"]
      : [
          "var(--text-color)",
          "var(--text-color)",
          "var(--text-color)",
          "var(--text-color)",
        ]
  );

  return (
    <motion.div className={`animated-counter ${className}`}>
      <motion.span
        className="animated-counter__value"
        style={{
          color: animatedColor,
          fontSize: "inherit",
          fontWeight: "inherit",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2,
        }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>

      {/* Эффект искр при достижении целевого значения */}
      {displayValue === value && value > 0 && (
        <motion.div
          className="animated-counter__celebration"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.3, 1],
            ease: "easeOut",
          }}
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
