import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedModal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "medium",
  animationType = "scale",
  showCloseButton = true,
  className = "",
  backdropClassName = "",
  closeOnBackdrop = true,
}) => {
  const sizeClasses = {
    small: { maxWidth: "320px", padding: "20px" },
    medium: { maxWidth: "480px", padding: "24px" },
    large: { maxWidth: "640px", padding: "32px" },
    fullscreen: { maxWidth: "100vw", maxHeight: "100vh", padding: "16px" },
  };

  const currentSize = sizeClasses[size];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const getModalVariants = () => {
    switch (animationType) {
      case "slide-up":
        return {
          hidden: {
            opacity: 0,
            y: "100vh",
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.3 },
            },
          },
          exit: {
            opacity: 0,
            y: "100vh",
            scale: 0.8,
            transition: { duration: 0.3 },
          },
        };

      case "slide-down":
        return {
          hidden: {
            opacity: 0,
            y: "-100vh",
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          },
          exit: {
            opacity: 0,
            y: "-100vh",
            scale: 0.8,
            transition: { duration: 0.3 },
          },
        };

      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4 },
          },
          exit: {
            opacity: 0,
            transition: { duration: 0.2 },
          },
        };

      case "bounce":
        return {
          hidden: {
            opacity: 0,
            scale: 0,
            rotate: -180,
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 15,
              opacity: { duration: 0.2 },
            },
          },
          exit: {
            opacity: 0,
            scale: 0,
            rotate: 180,
            transition: { duration: 0.3 },
          },
        };

      default: // scale
        return {
          hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
              opacity: { duration: 0.2 },
            },
          },
          exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: { duration: 0.2 },
          },
        };
    }
  };

  const modalVariants = getModalVariants();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`modal-backdrop ${backdropClassName}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeOnBackdrop ? onClose : undefined}
        >
          <motion.div
            className={`modal-content glass-card ${className}`}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              width: "100%",
              maxWidth: currentSize.maxWidth,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <motion.div
                className="modal-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${currentSize.padding} ${currentSize.padding} 16px`,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {title && (
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "var(--text-color)",
                    }}
                  >
                    {title}
                  </h2>
                )}

                {showCloseButton && (
                  <motion.button
                    className="modal-close-btn"
                    style={{
                      background: "rgba(0, 0, 0, 0.1)",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "var(--text-color)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className="modal-body"
              style={{
                padding: currentSize.padding,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>

            {/* Декоративные элементы */}
            <motion.div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "100px",
                height: "100px",
                background:
                  "radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
