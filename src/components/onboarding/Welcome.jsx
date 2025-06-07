import React from "react";

function Welcome({ onNext }) {
  return (
    <div className="text-center fade-in" style={{ padding: "40px 0" }}>
      <div style={{ fontSize: "64px", marginBottom: "24px" }}>🍎</div>

      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>
        Cal AI
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "var(--secondary-text-color)",
          marginBottom: "40px",
          lineHeight: "1.5",
        }}
      >
        Персональный помощник для подсчета калорий.
        <br />
        Узнайте свою дневную норму за 2 минуты!
      </p>

      <div className="card" style={{ marginBottom: "32px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          Что мы сделаем:
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>📊</span>
            <span>Определим ваши параметры</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🎯</span>
            <span>Выберем цель</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🧮</span>
            <span>Рассчитаем калории</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onNext({})}
        style={{ fontSize: "18px", padding: "16px 32px" }}
      >
        Начать
      </button>
    </div>
  );
}

export default Welcome;
