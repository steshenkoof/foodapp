import React, { useState } from "react";
import { getWeightSuggestions } from "../../utils/foodRecognition";

function FoodConfirmation({
  image,
  recognizedFood,
  onConfirm,
  onCancel,
  source,
  originalText,
}) {
  const [editedFood, setEditedFood] = useState(
    recognizedFood.map((item) => ({ ...item, isEditing: false }))
  );

  const handleWeightChange = (index, newWeight) => {
    setEditedFood((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, weight: parseFloat(newWeight) || 0 } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setEditedFood((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleEditing = (index) => {
    setEditedFood((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const calculateTotalNutrition = () => {
    return editedFood.reduce(
      (total, item) => {
        const multiplier = item.weight / 100;
        return {
          calories: total.calories + item.foodData.calories * multiplier,
          protein: total.protein + item.foodData.protein * multiplier,
          carbs: total.carbs + item.foodData.carbs * multiplier,
          fat: total.fat + item.foodData.fat * multiplier,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totals = calculateTotalNutrition();

  const getSourceIcon = () => {
    switch (source) {
      case "photo":
        return "📷";
      case "text":
        return "✏️";
      case "voice":
        return "🎤";
      default:
        return "🔍";
    }
  };

  return (
    <div className="fade-in">
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          {getSourceIcon()} Результат распознавания
        </h3>

        {image && (
          <img
            src={image}
            alt="Распознанное изображение"
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
        )}

        {originalText && (
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(0, 122, 255, 0.1)",
              borderRadius: "6px",
              fontSize: "14px",
              marginBottom: "16px",
              fontStyle: "italic",
            }}
          >
            "{originalText}"
          </div>
        )}

        <div
          style={{
            fontSize: "14px",
            color: "var(--secondary-text-color)",
            marginBottom: "16px",
          }}
        >
          Найдено продуктов: {editedFood.length}
        </div>

        {editedFood.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "var(--secondary-text-color)",
            }}
          >
            Продукты не найдены. Попробуйте другой способ ввода.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {editedFood.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>
                      {item.foodData.emoji}
                    </span>
                    <div>
                      <div style={{ fontWeight: "600" }}>
                        {item.foodData.name}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--secondary-text-color)",
                        }}
                      >
                        Уверенность: {Math.round(item.confidence * 100)}%
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => toggleEditing(index)}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "var(--primary-color)",
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleRemoveItem(index)}
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
                    gridTemplateColumns: "1fr auto",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Вес (г)
                    </label>
                    <input
                      type="number"
                      value={item.weight}
                      onChange={(e) =>
                        handleWeightChange(index, e.target.value)
                      }
                      min="1"
                      max="2000"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ textAlign: "center", fontSize: "12px" }}>
                    <div style={{ fontWeight: "600" }}>
                      {Math.round(item.foodData.calories * (item.weight / 100))}{" "}
                      ккал
                    </div>
                    <div style={{ color: "var(--secondary-text-color)" }}>
                      {(item.foodData.protein * (item.weight / 100)).toFixed(1)}
                      б /
                      {(item.foodData.carbs * (item.weight / 100)).toFixed(1)}у
                      /{(item.foodData.fat * (item.weight / 100)).toFixed(1)}ж
                    </div>
                  </div>
                </div>

                {item.isEditing && (
                  <div style={{ marginTop: "12px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        marginBottom: "6px",
                        color: "var(--secondary-text-color)",
                      }}
                    >
                      Быстрый выбор:
                    </div>
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      {getWeightSuggestions(item.foodData.key).map(
                        (suggestion, suggestionIndex) => (
                          <button
                            key={suggestionIndex}
                            onClick={() =>
                              handleWeightChange(index, suggestion.weight)
                            }
                            style={{
                              padding: "4px 8px",
                              fontSize: "11px",
                              background: "var(--border-color)",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            {suggestion.label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {editedFood.length > 0 && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <h4 style={{ marginBottom: "12px", fontSize: "16px" }}>📊 Итого</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "12px",
              textAlign: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "var(--primary-color)",
                }}
              >
                {Math.round(totals.calories)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                }}
              >
                ккал
              </div>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                {totals.protein.toFixed(1)}г
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                }}
              >
                белки
              </div>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                {totals.carbs.toFixed(1)}г
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                }}
              >
                углеводы
              </div>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                {totals.fat.toFixed(1)}г
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-text-color)",
                }}
              >
                жиры
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          style={{ flex: "0 0 auto", width: "100px" }}
        >
          Отмена
        </button>

        <button
          className="btn btn-primary"
          onClick={() => onConfirm(editedFood)}
          disabled={editedFood.length === 0}
          style={{ flex: 1 }}
        >
          ✅ Добавить в дневник
        </button>
      </div>
    </div>
  );
}

export default FoodConfirmation;
