import React, { useState } from "react";

function FoodList({ foodEntries, onEdit, onDelete, totals }) {
  const [editingId, setEditingId] = useState(null);
  const [editWeight, setEditWeight] = useState("");

  const handleEditStart = (entry) => {
    setEditingId(entry.id);
    setEditWeight(entry.weight.toString());
  };

  const handleEditSave = (id) => {
    const newWeight = parseFloat(editWeight);
    if (newWeight && newWeight > 0) {
      onEdit(id, { weight: newWeight });
    }
    setEditingId(null);
    setEditWeight("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditWeight("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateNutrition = (entry) => {
    const multiplier = entry.weight / 100;
    return {
      calories: Math.round(entry.foodData.calories * multiplier),
      protein: (entry.foodData.protein * multiplier).toFixed(1),
      carbs: (entry.foodData.carbs * multiplier).toFixed(1),
      fat: (entry.foodData.fat * multiplier).toFixed(1),
    };
  };

  if (foodEntries.length === 0) {
    return (
      <div
        className="card"
        style={{ textAlign: "center", padding: "40px 20px" }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍽️</div>
        <div
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
        >
          Дневник пуст
        </div>
        <div style={{ fontSize: "14px", color: "var(--secondary-text-color)" }}>
          Добавьте первый продукт, чтобы начать отслеживание питания
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Итоги дня */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          📊 Съедено сегодня
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "12px",
            textAlign: "center",
            padding: "16px",
            backgroundColor: "rgba(52, 199, 89, 0.1)",
            borderRadius: "8px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "var(--primary-color)",
              }}
            >
              {Math.round(totals.calories)}
            </div>
            <div
              style={{ fontSize: "12px", color: "var(--secondary-text-color)" }}
            >
              ккал
            </div>
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {totals.protein.toFixed(1)}г
            </div>
            <div
              style={{ fontSize: "12px", color: "var(--secondary-text-color)" }}
            >
              белки
            </div>
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {totals.carbs.toFixed(1)}г
            </div>
            <div
              style={{ fontSize: "12px", color: "var(--secondary-text-color)" }}
            >
              углеводы
            </div>
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {totals.fat.toFixed(1)}г
            </div>
            <div
              style={{ fontSize: "12px", color: "var(--secondary-text-color)" }}
            >
              жиры
            </div>
          </div>
        </div>
      </div>

      {/* Список продуктов */}
      <div style={{ display: "grid", gap: "12px" }}>
        {foodEntries.map((entry) => {
          const nutrition = calculateNutrition(entry);
          const isEditing = editingId === entry.id;

          return (
            <div key={entry.id} className="card" style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "24px" }}>
                    {entry.foodData.emoji}
                  </span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "16px" }}>
                      {entry.foodData.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text-color)",
                      }}
                    >
                      {formatTime(entry.timestamp)} • {entry.foodData.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() =>
                      isEditing
                        ? handleEditSave(entry.id)
                        : handleEditStart(entry)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                      color: "var(--primary-color)",
                    }}
                  >
                    {isEditing ? "✅" : "✏️"}
                  </button>

                  {isEditing && (
                    <button
                      onClick={handleEditCancel}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "var(--secondary-text-color)",
                      }}
                    >
                      ❌
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(entry.id)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                      color: "var(--danger-color)",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: "600" }}>Вес:</div>

                {isEditing ? (
                  <input
                    type="number"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    min="1"
                    max="2000"
                    style={{
                      padding: "6px 10px",
                      border: "1px solid var(--primary-color)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      width: "80px",
                    }}
                    autoFocus
                  />
                ) : (
                  <div style={{ fontSize: "14px" }}>{entry.weight}г</div>
                )}

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--primary-color)",
                  }}
                >
                  {nutrition.calories} ккал
                </div>
              </div>

              <div
                style={{
                  marginTop: "12px",
                  padding: "8px 12px",
                  backgroundColor: "rgba(0, 122, 255, 0.05)",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "8px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "600" }}>
                      {nutrition.protein}г
                    </span>
                    <div style={{ color: "var(--secondary-text-color)" }}>
                      белки
                    </div>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>
                      {nutrition.carbs}г
                    </span>
                    <div style={{ color: "var(--secondary-text-color)" }}>
                      углеводы
                    </div>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>{nutrition.fat}г</span>
                    <div style={{ color: "var(--secondary-text-color)" }}>
                      жиры
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Кнопка очистки */}
      {foodEntries.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              if (window.confirm("Очистить весь дневник питания?")) {
                foodEntries.forEach((entry) => onDelete(entry.id));
              }
            }}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            🗑️ Очистить дневник
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodList;
