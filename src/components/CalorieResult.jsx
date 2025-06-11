import React from "react";
import { motion } from "framer-motion";
import { calculateMacros } from "../utils/calorieCalculator";
import AnimatedCounter from "./AnimatedCounter";
import AnimatedButton from "./AnimatedButton";
import AnimatedProgressBar from "./AnimatedProgressBar";

function CalorieResult({ calorieData, userProfile, onReset, onStartTracking }) {
  const macros = calculateMacros(calorieData.targetCalories);

  return (
    <div
      className="fade-in"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      <div className="text-center mb-6">
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <h1
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}
        >
          Ваша норма калорий
        </h1>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Персональный расчет на основе ваших данных
        </p>
      </div>

      {/* Основной результат */}
      <motion.div
        className="result-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.3,
        }}
      >
        <div className="result-calories">
          <AnimatedCounter
            value={calorieData.targetCalories}
            duration={2500}
            colorThresholds={{
              low: 30,
              medium: 70,
              colors: ["#34c759", "#ff9500", "#ff3b30"],
            }}
          />
        </div>
        <div className="result-label">калорий в день</div>
        <motion.div
          className="result-goal"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {calorieData.goal.label}
        </motion.div>
      </motion.div>

      {/* Кнопка начать трекинг */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ marginBottom: "20px" }}
      >
        <AnimatedButton
          onClick={onStartTracking}
          variant="primary"
          size="large"
          pulse={true}
        >
          📷 Начать добавлять еду
        </AnimatedButton>
      </motion.div>

      {/* Детальная информация */}
      <div className="card">
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          📊 Детали расчета
        </h3>

        <div style={{ display: "grid", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Базовый метаболизм (BMR)</span>
            <span style={{ fontWeight: "600" }}>{calorieData.bmr} ккал</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Общий расход (TDEE)</span>
            <span style={{ fontWeight: "600" }}>{calorieData.tdee} ккал</span>
          </div>

          <div
            style={{
              height: "1px",
              background: "var(--border-color)",
              margin: "8px 0",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "600" }}>Целевые калории</span>
            <span style={{ fontWeight: "700", color: "var(--primary-color)" }}>
              {calorieData.targetCalories} ккал
            </span>
          </div>
        </div>
      </div>

      {/* Макронутриенты */}
      <div className="card">
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          🍽️ Рекомендуемые макронутриенты
        </h3>

        <div style={{ display: "grid", gap: "16px" }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <AnimatedProgressBar
              value={30}
              max={100}
              height={8}
              color="#FF6B6B"
              backgroundColor="#FFE5E5"
              showPercentage={false}
              showValue={false}
              label={`🥩 Белки (30%) • ${macros.protein.grams}г`}
              glow={true}
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <AnimatedProgressBar
              value={40}
              max={100}
              height={8}
              color="#4ECDC4"
              backgroundColor="#E5F7FF"
              showPercentage={false}
              showValue={false}
              label={`🍞 Углеводы (40%) • ${macros.carbs.grams}г`}
              glow={true}
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <AnimatedProgressBar
              value={30}
              max={100}
              height={8}
              color="#FFB84D"
              backgroundColor="#FFF5E5"
              showPercentage={false}
              showValue={false}
              label={`🥑 Жиры (30%) • ${macros.fat.grams}г`}
              glow={true}
            />
          </motion.div>
        </div>
      </div>

      {/* Ваш профиль */}
      <div className="card">
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          👤 Ваш профиль
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            fontSize: "14px",
          }}
        >
          <div>
            <div
              style={{
                color: "var(--secondary-text-color)",
                marginBottom: "4px",
              }}
            >
              Пол
            </div>
            <div style={{ fontWeight: "600" }}>
              {userProfile.gender === "male" ? "👨 Мужской" : "👩 Женский"}
            </div>
          </div>

          <div>
            <div
              style={{
                color: "var(--secondary-text-color)",
                marginBottom: "4px",
              }}
            >
              Возраст
            </div>
            <div style={{ fontWeight: "600" }}>{userProfile.age} лет</div>
          </div>

          <div>
            <div
              style={{
                color: "var(--secondary-text-color)",
                marginBottom: "4px",
              }}
            >
              Рост
            </div>
            <div style={{ fontWeight: "600" }}>{userProfile.height} см</div>
          </div>

          <div>
            <div
              style={{
                color: "var(--secondary-text-color)",
                marginBottom: "4px",
              }}
            >
              Вес
            </div>
            <div style={{ fontWeight: "600" }}>{userProfile.weight} кг</div>
          </div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <div
            style={{
              color: "var(--secondary-text-color)",
              marginBottom: "4px",
            }}
          >
            Активность
          </div>
          <div style={{ fontWeight: "600" }}>{calorieData.activity.label}</div>
        </div>
      </div>

      {/* Рекомендации */}
      <div
        className="card"
        style={{ backgroundColor: "rgba(0, 122, 255, 0.05)" }}
      >
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          💡 Рекомендации
        </h3>

        <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
          {calorieData.goal.label === "Снижение веса" && (
            <div>
              • Создайте дефицит калорий, но не менее 1200 ккал в день
              <br />
              • Увеличьте потребление белка для сохранения мышечной массы
              <br />
              • Добавьте кардио и силовые тренировки
              <br />• Пейте больше воды и высыпайтесь
            </div>
          )}

          {calorieData.goal.label === "Сохранение веса" && (
            <div>
              • Следите за балансом калорий
              <br />
              • Поддерживайте регулярную физическую активность
              <br />
              • Включайте разнообразные продукты в рацион
              <br />• Контролируйте вес еженедельно
            </div>
          )}

          {calorieData.goal.label === "Набор веса" && (
            <div>
              • Создайте профицит калорий качественными продуктами
              <br />
              • Увеличьте потребление белка до 2г на кг веса
              <br />
              • Добавьте силовые тренировки для роста мышц
              <br />• Ешьте часто, но небольшими порциями
            </div>
          )}
        </div>
      </div>

      {/* Кнопки действий */}
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate("food")}
          style={{ flex: 1 }}
        >
          📷 Начать отслеживание
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          🔄 Пересчитать
        </button>
      </div>
    </div>
  );
}

export default CalorieResult;
