import React, { useState, useEffect } from "react";
import { searchFood, FOOD_CATEGORIES } from "../../data/foodDatabase";
import { getWeightSuggestions } from "../../utils/foodRecognition";

function FoodSearch({ onFoodAdd }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [weight, setWeight] = useState(100);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchFood(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setWeight(100); // Сброс веса по умолчанию
  };

  const handleAddFood = () => {
    if (!selectedFood || !weight) return;

    setIsAdding(true);

    const foodEntry = {
      food: selectedFood.key,
      weight: parseFloat(weight),
      confidence: 1.0,
      foodData: selectedFood,
    };

    setTimeout(() => {
      onFoodAdd([foodEntry]);
      setSearchQuery("");
      setSelectedFood(null);
      setWeight(100);
      setIsAdding(false);
    }, 300);
  };

  const calculateNutrition = () => {
    if (!selectedFood || !weight) return null;

    const multiplier = weight / 100;
    return {
      calories: Math.round(selectedFood.calories * multiplier),
      protein: (selectedFood.protein * multiplier).toFixed(1),
      carbs: (selectedFood.carbs * multiplier).toFixed(1),
      fat: (selectedFood.fat * multiplier).toFixed(1),
    };
  };

  const nutrition = calculateNutrition();
  const weightSuggestions = selectedFood
    ? getWeightSuggestions(selectedFood.key)
    : [];

  return (
    <div>
      {/* Поиск */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="form-group">
          <label className="form-label">Найти продукт</label>
          <input
            type="text"
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Например: яблоко, куриная грудка, рис..."
          />
        </div>

        {/* Результаты поиска */}
        {searchResults.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                color: "var(--secondary-text-color)",
                marginBottom: "8px",
              }}
            >
              Найдено {searchResults.length} продуктов:
            </div>
            <div
              style={{
                display: "grid",
                gap: "8px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {searchResults.map((food) => (
                <div
                  key={food.key}
                  onClick={() => handleFoodSelect(food)}
                  style={{
                    padding: "12px",
                    border: "2px solid var(--border-color)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor:
                      selectedFood?.key === food.key
                        ? "rgba(0, 122, 255, 0.1)"
                        : "transparent",
                    borderColor:
                      selectedFood?.key === food.key
                        ? "var(--primary-color)"
                        : "var(--border-color)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{food.emoji}</span>
                      <div>
                        <div style={{ fontWeight: "600" }}>{food.name}</div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--secondary-text-color)",
                          }}
                        >
                          {food.category}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "12px" }}>
                      <div style={{ fontWeight: "600" }}>
                        {food.calories} ккал
                      </div>
                      <div style={{ color: "var(--secondary-text-color)" }}>
                        на 100г
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              textAlign: "center",
              color: "var(--secondary-text-color)",
              backgroundColor: "rgba(255, 183, 77, 0.1)",
              borderRadius: "8px",
            }}
          >
            Продукт не найден. Попробуйте другое название или добавьте через
            фото/текст.
          </div>
        )}
      </div>

      {/* Настройка веса */}
      {selectedFood && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <h4 style={{ marginBottom: "16px", fontSize: "16px" }}>
            {selectedFood.emoji} {selectedFood.name}
          </h4>

          <div className="form-group">
            <label className="form-label">Вес (граммы)</label>
            <input
              type="number"
              className="form-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              max="2000"
              step="1"
            />
          </div>

          {/* Быстрые варианты веса */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "var(--secondary-text-color)",
              }}
            >
              Быстрый выбор:
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {weightSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="btn btn-secondary"
                  onClick={() => setWeight(suggestion.weight)}
                  style={{
                    fontSize: "12px",
                    padding: "6px 12px",
                    minHeight: "auto",
                  }}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>

          {/* Расчет питательности */}
          {nutrition && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "rgba(52, 199, 89, 0.1)",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                На {weight}г:
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "600" }}>{nutrition.calories}</div>
                  <div style={{ color: "var(--secondary-text-color)" }}>
                    ккал
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "600" }}>{nutrition.protein}г</div>
                  <div style={{ color: "var(--secondary-text-color)" }}>
                    белки
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "600" }}>{nutrition.carbs}г</div>
                  <div style={{ color: "var(--secondary-text-color)" }}>
                    углеводы
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "600" }}>{nutrition.fat}г</div>
                  <div style={{ color: "var(--secondary-text-color)" }}>
                    жиры
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleAddFood}
            disabled={!weight || weight <= 0 || isAdding}
            style={{ fontSize: "16px" }}
          >
            {isAdding ? "⏳ Добавляем..." : "✅ Добавить в дневник"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodSearch;
