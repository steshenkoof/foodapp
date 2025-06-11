import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedIcon from "./AnimatedIcon";
import "../styles/Navigation.css";

const Navigation = ({ currentScreen, onNavigate, foodEntriesCount }) => {
  const navItems = [
    {
      id: "results",
      icon: "🏠",
      label: "Главная",
      screen: "results",
      animationType: "pulse",
    },
    {
      id: "food",
      icon: "📷",
      label: "Добавить",
      screen: "food",
      animationType: "bounce",
    },
    {
      id: "summary",
      icon: "📊",
      label: "Дневник",
      screen: "summary",
      badge: foodEntriesCount > 0 ? foodEntriesCount : null,
      animationType: "wiggle",
    },
    {
      id: "assistant",
      icon: "🤖",
      label: "Помощник",
      screen: "assistant",
      animationType: "float",
    },
    {
      id: "history",
      icon: "📈",
      label: "История",
      screen: "history",
      animationType: "spin",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Настройки",
      screen: "settings",
      animationType: "spin",
    },
  ];

  const containerVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
  };

  const activeItemVariants = {
    active: {
      scale: 1.1,
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
    inactive: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <motion.nav
      className="navigation"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="nav-container">
        {navItems.map((item, index) => {
          const isActive = currentScreen === item.screen;

          return (
            <motion.button
              key={item.id}
              className={`nav-item ${isActive ? "nav-item--active" : ""}`}
              variants={itemVariants}
              animate={isActive ? "active" : "inactive"}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              onClick={() => onNavigate(item.screen)}
            >
              <motion.div
                className="nav-icon"
                variants={activeItemVariants}
                animate={isActive ? "active" : "inactive"}
              >
                <AnimatedIcon
                  icon={item.icon}
                  isActive={isActive}
                  animationType={item.animationType}
                  size={24}
                />

                {/* Анимированный badge */}
                <AnimatePresence>
                  {item.badge && (
                    <motion.span
                      className="nav-badge"
                      variants={badgeVariants}
                      initial="hidden"
                      animate={["visible", "pulse"]}
                      exit="hidden"
                      key={item.badge}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.span
                className="nav-label"
                animate={{
                  color: isActive
                    ? "var(--primary-color)"
                    : "var(--secondary-text-color)",
                  fontWeight: isActive ? 600 : 400,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>

              {/* Индикатор активности */}
              {isActive && (
                <motion.div
                  className="nav-active-indicator"
                  layoutId="activeIndicator"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Волновой эффект при нажатии */}
              <motion.div
                className="nav-ripple"
                initial={{ scale: 0, opacity: 0.3 }}
                whileTap={{
                  scale: 4,
                  opacity: 0,
                  transition: { duration: 0.4 },
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Фоновое свечение */}
      <motion.div
        className="nav-glow"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.nav>
  );
};

export default Navigation;
