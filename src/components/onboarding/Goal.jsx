import React, { useState } from "react";
import { WEIGHT_GOALS } from "../../utils/calorieCalculator";

function Goal({ data, onNext, onBack }) {
  const [goal, setGoal] = useState(data.goal || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal) {
      onNext({ goal });
    }
  };

  const isValid = goal;

  return (
    <div className="fade-in">
      <div className="text-center mb-6">
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}
        >
          Ваша цель
        </h2>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Что вы хотите сделать с вашим весом?
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="radio-group">
            {Object.entries(WEIGHT_GOALS).map(([key, goalData]) => (
              <label
                key={key}
                className={`radio-option ${goal === key ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="goal"
                  value={key}
                  checked={goal === key}
                  onChange={(e) => setGoal(e.target.value)}
                />
                <div className="radio-option-content">
                  <div className="radio-option-title">
                    {getGoalIcon(key)} {goalData.label}
                  </div>
                  <div className="radio-option-description">
                    {goalData.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {goal && (
          <div
            className="card"
            style={{
              backgroundColor: "rgba(0, 122, 255, 0.1)",
              border: "1px solid var(--primary-color)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>
                {getGoalIcon(goal)}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {WEIGHT_GOALS[goal].label}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--secondary-text-color)",
                }}
              >
                {goal === "lose" &&
                  "Создадим дефицит калорий для здорового похудения"}
                {goal === "maintain" &&
                  "Поддержим ваш текущий вес с правильным питанием"}
                {goal === "gain" &&
                  "Создадим профицит калорий для набора массы"}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
            style={{ flex: "0 0 auto", width: "80px" }}
          >
            Назад
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid}
            style={{ flex: 1 }}
          >
            Рассчитать калории
          </button>
        </div>
      </form>
    </div>
  );
}

function getGoalIcon(goalKey) {
  const icons = {
    lose: "📉",
    maintain: "⚖️",
    gain: "📈",
  };
  return icons[goalKey] || "🎯";
}

export default Goal;
