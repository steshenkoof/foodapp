import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Выберите опцию",
  searchable = false,
  multiple = false,
  disabled = false,
  icon,
  className = "",
  dropdownClassName = "",
  maxHeight = "200px",
  showGroupLabels = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фокус на поле поиска при открытии
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Фильтрация опций
  const filteredOptions = options.filter((option) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    if (option.group) {
      return option.items.some(
        (item) =>
          item.label.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      );
    }

    return (
      option.label.toLowerCase().includes(searchLower) ||
      option.description?.toLowerCase().includes(searchLower)
    );
  });

  // Получение отображаемого текста
  const getDisplayText = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find((opt) => opt.value === value[0]);
        return option ? option.label : value[0];
      }
      return `Выбрано: ${value.length}`;
    }

    const option = options.find((opt) => opt.value === value);
    return option ? option.label : placeholder;
  };

  // Обработка выбора опции
  const handleOptionClick = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(optionValue);

      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(optionValue);
      }

      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // Проверка, выбрана ли опция
  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  return (
    <div
      className={`animated-dropdown ${className}`}
      ref={dropdownRef}
      style={{ position: "relative", width: "100%" }}
    >
      {/* Trigger Button */}
      <motion.button
        className="dropdown-trigger"
        style={{
          width: "100%",
          padding: "16px 20px",
          border: "2px solid var(--border-color)",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          color: "var(--text-color)",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "16px",
          transition: "all 0.3s ease",
          opacity: disabled ? 0.6 : 1,
        }}
        whileHover={
          !disabled
            ? {
                borderColor: "var(--primary-color)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 20px rgba(0, 122, 255, 0.1)",
              }
            : {}
        }
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
          <span
            style={{
              color: value
                ? "var(--text-color)"
                : "var(--secondary-text-color)",
              textAlign: "left",
            }}
          >
            {getDisplayText()}
          </span>
        </div>

        <motion.span
          style={{ fontSize: "12px", color: "var(--secondary-text-color)" }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`dropdown-menu glass-card ${dropdownClassName}`}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "8px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              overflow: "hidden",
            }}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Search Input */}
            {searchable && (
              <motion.div
                style={{ padding: "16px 16px 8px" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Поиск..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </motion.div>
            )}

            {/* Options List */}
            <div
              style={{
                maxHeight,
                overflowY: "auto",
                padding: "8px",
              }}
            >
              {filteredOptions.length === 0 ? (
                <motion.div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "var(--secondary-text-color)",
                    fontSize: "14px",
                  }}
                  variants={itemVariants}
                >
                  Ничего не найдено
                </motion.div>
              ) : (
                filteredOptions.map((option, index) => {
                  if (option.group) {
                    return (
                      <motion.div key={option.group} variants={itemVariants}>
                        {showGroupLabels && (
                          <div
                            style={{
                              padding: "8px 16px 4px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "var(--secondary-text-color)",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {option.group}
                          </div>
                        )}
                        {option.items.map((item, itemIndex) => (
                          <DropdownOption
                            key={item.value}
                            option={item}
                            isSelected={isSelected(item.value)}
                            onClick={() => handleOptionClick(item.value)}
                            variants={itemVariants}
                          />
                        ))}
                      </motion.div>
                    );
                  }

                  return (
                    <DropdownOption
                      key={option.value}
                      option={option}
                      isSelected={isSelected(option.value)}
                      onClick={() => handleOptionClick(option.value)}
                      variants={itemVariants}
                    />
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Компонент отдельной опции
const DropdownOption = ({ option, isSelected, onClick, variants }) => {
  return (
    <motion.div
      className="dropdown-option"
      style={{
        padding: "12px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: isSelected ? "rgba(0, 122, 255, 0.1)" : "transparent",
        border: isSelected
          ? "1px solid rgba(0, 122, 255, 0.3)"
          : "1px solid transparent",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "2px 0",
      }}
      variants={variants}
      whileHover={{
        backgroundColor: isSelected
          ? "rgba(0, 122, 255, 0.15)"
          : "rgba(0, 122, 255, 0.05)",
        transform: "translateX(4px)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {option.icon && <span style={{ fontSize: "18px" }}>{option.icon}</span>}

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: isSelected ? "600" : "500",
            color: isSelected ? "var(--primary-color)" : "var(--text-color)",
            fontSize: "14px",
          }}
        >
          {option.label}
        </div>

        {option.description && (
          <div
            style={{
              fontSize: "12px",
              color: "var(--secondary-text-color)",
              marginTop: "2px",
            }}
          >
            {option.description}
          </div>
        )}
      </div>

      {isSelected && (
        <motion.span
          style={{
            color: "var(--primary-color)",
            fontSize: "16px",
            fontWeight: "700",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          ✓
        </motion.span>
      )}
    </motion.div>
  );
};

export default AnimatedDropdown;
