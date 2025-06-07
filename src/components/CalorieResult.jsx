import React from "react";
import { calculateMacros } from "../utils/calorieCalculator";

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
      <div className="result-card">
        <div className="result-calories">{calorieData.targetCalories}</div>
        <div className="result-label">калорий в день</div>
        <div className="result-goal">{calorieData.goal.label}</div>
      </div>

      {/* Кнопка начать трекинг */}
      <button
        className="btn btn-primary"
        onClick={onStartTracking}
        style={{
          marginBottom: "20px",
          background:
            "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
          fontSize: "18px",
          padding: "16px 24px",
        }}
      >
        📷 Начать добавлять еду
      </button>

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
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span>🥩 Белки (30%)</span>
              <span style={{ fontWeight: "600" }}>{macros.protein.grams}г</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#FFE5E5",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "100%",
                  background: "#FF6B6B",
                  borderRadius: "3px",
                }}
              ></div>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span>🍞 Углеводы (40%)</span>
              <span style={{ fontWeight: "600" }}>{macros.carbs.grams}г</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#E5F7FF",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  background: "#4ECDC4",
                  borderRadius: "3px",
                }}
              ></div>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span>🥑 Жиры (30%)</span>
              <span style={{ fontWeight: "600" }}>{macros.fat.grams}г</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#FFF5E5",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "100%",
                  background: "#FFB84D",
                  borderRadius: "3px",
                }}
              ></div>
            </div>
          </div>
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
