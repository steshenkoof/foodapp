import React, { useState } from "react";

function GenderAge({ data, onNext, onBack }) {
  const [gender, setGender] = useState(data.gender || "");
  const [age, setAge] = useState(data.age || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gender && age) {
      onNext({ gender, age: parseInt(age) });
    }
  };

  const isValid = gender && age && age >= 15 && age <= 100;

  return (
    <div className="fade-in">
      <div className="text-center mb-6">
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}
        >
          Основные данные
        </h2>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Расскажите о себе
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Пол</label>
          <div className="radio-group">
            <label
              className={`radio-option ${gender === "male" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <div className="radio-option-content">
                <div className="radio-option-title">👨 Мужской</div>
              </div>
            </label>

            <label
              className={`radio-option ${
                gender === "female" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <div className="radio-option-content">
                <div className="radio-option-title">👩 Женский</div>
              </div>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Возраст</label>
          <input
            type="number"
            className="form-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Введите ваш возраст"
            min="15"
            max="100"
          />
          {age && (age < 15 || age > 100) && (
            <p
              style={{
                color: "var(--danger-color)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              Возраст должен быть от 15 до 100 лет
            </p>
          )}
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

export default GenderAge;
