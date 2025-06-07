import React, { useState } from "react";
import FoodInput from "./food/FoodInput";
import FoodList from "./food/FoodList";
import DailyProgress from "./food/DailyProgress";

function FoodTracker({ userProfile, calorieData, onBack }) {
  const [foodEntries, setFoodEntries] = useState([]);
  const [currentView, setCurrentView] = useState("input"); // 'input' | 'list'

  const handleFoodAdd = (newEntries) => {
    const entriesWithId = newEntries.map((entry) => ({
      ...entry,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
    }));
    setFoodEntries((prev) => [...prev, ...entriesWithId]);
    setCurrentView("list");
  };

  const handleFoodEdit = (id, updatedEntry) => {
    setFoodEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const handleFoodDelete = (id) => {
    setFoodEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const calculateTotals = () => {
    return foodEntries.reduce(
      (totals, entry) => {
        const multiplier = entry.weight / 100; // Данные в БД на 100г
        return {
          calories: totals.calories + entry.foodData.calories * multiplier,
          protein: totals.protein + entry.foodData.protein * multiplier,
          carbs: totals.carbs + entry.foodData.carbs * multiplier,
          fat: totals.fat + entry.foodData.fat * multiplier,
          fiber: totals.fiber + entry.foodData.fiber * multiplier,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div
      className="fade-in"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      {/* Заголовок */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "12px",
            color: "var(--text-color)",
          }}
        >
          ←
        </button>
        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Трекер питания</h1>
      </div>

      {/* Прогресс дня */}
      <DailyProgress
        totals={totals}
        targetCalories={calorieData.targetCalories}
        userProfile={userProfile}
      />

      {/* Навигация */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          background: "var(--border-color)",
          padding: "4px",
          borderRadius: "12px",
        }}
      >
        <button
          className={`btn ${
            currentView === "input" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setCurrentView("input")}
          style={{
            flex: 1,
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          📷 Добавить еду
        </button>
        <button
          className={`btn ${
            currentView === "list" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setCurrentView("list")}
          style={{
            flex: 1,
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          📋 Дневник ({foodEntries.length})
        </button>
      </div>

      {/* Содержимое */}
      {currentView === "input" ? (
        <FoodInput onFoodAdd={handleFoodAdd} />
      ) : (
        <FoodList
          foodEntries={foodEntries}
          onEdit={handleFoodEdit}
          onDelete={handleFoodDelete}
          totals={totals}
        />
      )}
    </div>
  );
}

export default FoodTracker;
