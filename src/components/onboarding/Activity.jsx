import React, { useState } from "react";
import { ACTIVITY_LEVELS } from "../../utils/calorieCalculator";

function Activity({ data, onNext, onBack }) {
  const [activity, setActivity] = useState(data.activity || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity) {
      onNext({ activity });
    }
  };

  const isValid = activity;

  return (
    <div className="fade-in">
      <div className="text-center mb-6">
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}
        >
          Уровень активности
        </h2>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Выберите ваш обычный уровень физической активности
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="radio-group">
            {Object.entries(ACTIVITY_LEVELS).map(([key, level]) => (
              <label
                key={key}
                className={`radio-option ${activity === key ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="activity"
                  value={key}
                  checked={activity === key}
                  onChange={(e) => setActivity(e.target.value)}
                />
                <div className="radio-option-content">
                  <div className="radio-option-title">
                    {getActivityIcon(key)} {level.label}
                  </div>
                  <div className="radio-option-description">
                    {level.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

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
            Далее
          </button>
        </div>
      </form>
    </div>
  );
}

function getActivityIcon(activityKey) {
  const icons = {
    sedentary: "🪑",
    light: "🚶",
    moderate: "🏃",
    high: "🏋️",
    extreme: "💪",
  };
  return icons[activityKey] || "🏃";
}

export default Activity;
