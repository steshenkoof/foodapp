import React, { useState } from "react";

function HeightWeight({ data, onNext, onBack }) {
  const [height, setHeight] = useState(data.height || "");
  const [weight, setWeight] = useState(data.weight || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (height && weight) {
      onNext({ height: parseInt(height), weight: parseFloat(weight) });
    }
  };

  const isValidHeight = height && height >= 120 && height <= 250;
  const isValidWeight = weight && weight >= 30 && weight <= 300;
  const isValid = isValidHeight && isValidWeight;

  return (
    <div className="fade-in">
      <div className="text-center mb-6">
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}
        >
          Параметры тела
        </h2>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Введите ваш рост и вес
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Рост (см)</label>
          <input
            type="number"
            className="form-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Например, 175"
            min="120"
            max="250"
          />
          {height && !isValidHeight && (
            <p
              style={{
                color: "var(--danger-color)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              Рост должен быть от 120 до 250 см
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Вес (кг)</label>
          <input
            type="number"
            step="0.1"
            className="form-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Например, 70.5"
            min="30"
            max="300"
          />
          {weight && !isValidWeight && (
            <p
              style={{
                color: "var(--danger-color)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              Вес должен быть от 30 до 300 кг
            </p>
          )}
        </div>

        {height && weight && isValid && (
          <div
            className="card"
            style={{
              backgroundColor: "rgba(52, 199, 89, 0.1)",
              border: "1px solid var(--secondary-color)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                ИМТ: {(weight / (height / 100) ** 2).toFixed(1)}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--secondary-text-color)",
                }}
              >
                {(() => {
                  const bmi = weight / (height / 100) ** 2;
                  if (bmi < 18.5) return "📉 Недостаточный вес";
                  if (bmi < 25) return "✅ Нормальный вес";
                  if (bmi < 30) return "📈 Избыточный вес";
                  return "🔴 Ожирение";
                })()}
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
            Далее
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeightWeight;
