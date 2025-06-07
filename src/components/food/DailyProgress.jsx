import React from "react";
import { calculateMacros } from "../../utils/calorieCalculator";

function DailyProgress({ totals, targetCalories, userProfile }) {
  const targetMacros = calculateMacros(targetCalories);

  const calorieProgress = (totals.calories / targetCalories) * 100;
  const proteinProgress = (totals.protein / targetMacros.protein.grams) * 100;
  const carbsProgress = (totals.carbs / targetMacros.carbs.grams) * 100;
  const fatProgress = (totals.fat / targetMacros.fat.grams) * 100;

  const getProgressColor = (progress) => {
    if (progress < 50) return "#FF6B6B";
    if (progress < 90) return "#FFB84D";
    if (progress <= 110) return "#4ECDC4";
    return "#FF6B6B";
  };

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
        📊 Прогресс дня
      </h3>

      {/* Калории */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Калории</span>
          <span style={{ fontSize: "16px", fontWeight: "600" }}>
            {Math.round(totals.calories)} / {targetCalories} ккал
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "var(--border-color)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(calorieProgress, 100)}%`,
              height: "100%",
              background: getProgressColor(calorieProgress),
              borderRadius: "6px",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "var(--secondary-text-color)",
            marginTop: "4px",
          }}
        >
          {calorieProgress > 100
            ? `Превышение на ${Math.round(
                totals.calories - targetCalories
              )} ккал`
            : `Осталось ${Math.round(targetCalories - totals.calories)} ккал`}
        </div>
      </div>

      {/* Макронутриенты */}
      <div style={{ display: "grid", gap: "16px" }}>
        {/* Белки */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🥩 Белки</span>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {totals.protein.toFixed(1)}г / {targetMacros.protein.grams}г
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#FFE5E5",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(proteinProgress, 100)}%`,
                height: "100%",
                background: "#FF6B6B",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Углеводы */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🍞 Углеводы</span>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {totals.carbs.toFixed(1)}г / {targetMacros.carbs.grams}г
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#E5F7FF",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(carbsProgress, 100)}%`,
                height: "100%",
                background: "#4ECDC4",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Жиры */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🥑 Жиры</span>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {totals.fat.toFixed(1)}г / {targetMacros.fat.grams}г
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#FFF5E5",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(fatProgress, 100)}%`,
                height: "100%",
                background: "#FFB84D",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Мотивационное сообщение */}
      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          background: "rgba(0, 122, 255, 0.1)",
          borderRadius: "8px",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {calorieProgress < 50 &&
          "🌟 Отличное начало! Продолжайте добавлять еду"}
        {calorieProgress >= 50 &&
          calorieProgress < 90 &&
          "👍 Хороший прогресс! Вы на правильном пути"}
        {calorieProgress >= 90 &&
          calorieProgress <= 110 &&
          "🎯 Отлично! Вы достигли своей цели"}
        {calorieProgress > 110 &&
          "⚠️ Превышение калорий. Возможно, стоит быть более внимательным"}
      </div>
    </div>
  );
}

export default DailyProgress;
