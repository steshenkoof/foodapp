import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ActivityStep = ({ data = {}, updateData }) => {
  const [selectedActivity, setSelectedActivity] = useState(
    data.activity || null
  );

  useEffect(() => {
    updateData({ activity: selectedActivity });
  }, [selectedActivity, updateData]);

  const activityLevels = [
    {
      id: "sedentary",
      title: "Малоподвижный",
      subtitle: "Сидячая работа",
      description: "Офисная работа, минимум физической активности",
      emoji: "🪑",
      multiplier: 1.2,
      examples: ["Офисная работа", "Учеба за компьютером", "Чтение"],
      color: "#74B9FF",
    },
    {
      id: "light",
      title: "Легкая активность",
      subtitle: "1-3 дня в неделю",
      description: "Легкие упражнения или спорт несколько раз в неделю",
      emoji: "🚶",
      multiplier: 1.375,
      examples: ["Прогулки", "Легкая йога", "Домашние дела"],
      color: "#00B894",
    },
    {
      id: "moderate",
      title: "Умеренная активность",
      subtitle: "3-5 дней в неделю",
      description: "Умеренные упражнения или спорт 3-5 раз в неделю",
      emoji: "🏃",
      multiplier: 1.55,
      examples: ["Бег трусцой", "Плавание", "Велосипед"],
      color: "#FDCB6E",
    },
    {
      id: "high",
      title: "Высокая активность",
      subtitle: "6-7 дней в неделю",
      description: "Интенсивные упражнения или спорт 6-7 раз в неделю",
      emoji: "💪",
      multiplier: 1.725,
      examples: ["Тренажерный зал", "Кроссфит", "Интенсивный спорт"],
      color: "#E17055",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Заголовок */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "16px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3
          style={{
            fontSize: "28px",
            margin: "0 0 8px",
            color: "var(--text-color)",
            fontWeight: "700",
          }}
        >
          Уровень активности 🏃‍♀️
        </h3>
        <p
          style={{
            fontSize: "16px",
            color: "var(--secondary-text-color)",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          Выберите уровень вашей физической активности для точного расчета
          калорий
        </p>
      </motion.div>

      {/* Карточки активности */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
        variants={containerVariants}
      >
        {activityLevels.map((level, index) => (
          <motion.div
            key={level.id}
            style={{
              background:
                selectedActivity === level.id
                  ? `linear-gradient(135deg, ${level.color}20, ${level.color}10)`
                  : "rgba(255, 255, 255, 0.05)",
              border:
                selectedActivity === level.id
                  ? `2px solid ${level.color}`
                  : "2px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "24px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            variants={cardVariants}
            whileHover={{
              transform: "translateY(-4px)",
              boxShadow: `0 8px 32px ${level.color}40`,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedActivity(level.id)}
          >
            {/* Фоновая анимация */}
            <motion.div
              style={{
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "100px",
                height: "100px",
                background: `radial-gradient(circle, ${level.color}20 0%, transparent 70%)`,
                borderRadius: "50%",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
              animate={{
                scale: selectedActivity === level.id ? [1, 1.2, 1] : 1,
                opacity: selectedActivity === level.id ? [0.3, 0.6, 0.3] : 0.2,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Иконка и заголовок */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  fontSize: "32px",
                  marginRight: "16px",
                  padding: "8px",
                  background: `${level.color}20`,
                  borderRadius: "12px",
                }}
                animate={{
                  scale: selectedActivity === level.id ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {level.emoji}
              </motion.div>

              <div>
                <h4
                  style={{
                    fontSize: "18px",
                    margin: "0 0 4px",
                    color:
                      selectedActivity === level.id
                        ? level.color
                        : "var(--text-color)",
                    fontWeight: "700",
                    transition: "color 0.3s ease",
                  }}
                >
                  {level.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--secondary-text-color)",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  {level.subtitle}
                </p>
              </div>
            </div>

            {/* Описание */}
            <p
              style={{
                fontSize: "14px",
                color: "var(--secondary-text-color)",
                lineHeight: "1.4",
                marginBottom: "16px",
              }}
            >
              {level.description}
            </p>

            {/* Примеры */}
            <div style={{ marginBottom: "16px" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                  marginBottom: "8px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Примеры:
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {level.examples.map((example, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "12px",
                      color:
                        selectedActivity === level.id
                          ? level.color
                          : "var(--text-color)",
                      background:
                        selectedActivity === level.id
                          ? `${level.color}20`
                          : "rgba(255, 255, 255, 0.1)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border:
                        selectedActivity === level.id
                          ? `1px solid ${level.color}40`
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            {/* Коэффициент активности */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                }}
              >
                Коэффициент: {level.multiplier}
              </span>

              {selectedActivity === level.id && (
                <motion.div
                  style={{
                    color: level.color,
                    fontSize: "18px",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  ✓
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Информационная панель */}
      {selectedActivity && (
        <motion.div
          style={{
            background: "rgba(0, 122, 255, 0.1)",
            border: "1px solid rgba(0, 122, 255, 0.2)",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.2,
          }}
        >
          <motion.div
            style={{ fontSize: "24px", marginBottom: "8px" }}
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⚡
          </motion.div>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-color)",
              margin: "0 0 8px",
              fontWeight: "600",
            }}
          >
            Отличный выбор!
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--secondary-text-color)",
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            Мы учтем ваш уровень активности при расчете рекомендуемого
            количества калорий и составлении плана питания.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivityStep;
