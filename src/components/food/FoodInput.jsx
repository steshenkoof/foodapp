import React, { useState } from "react";
import PhotoCapture from "./PhotoCapture";
import TextInput from "./TextInput";
import VoiceInput from "./VoiceInput";
import FoodSearch from "./FoodSearch";

function FoodInput({ onFoodAdd }) {
  const [activeInput, setActiveInput] = useState("search"); // 'photo' | 'text' | 'voice' | 'search'
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessingStart = () => {
    setIsProcessing(true);
  };

  const handleProcessingEnd = () => {
    setIsProcessing(false);
  };

  const handleFoodRecognized = (recognizedFood) => {
    onFoodAdd(recognizedFood);
    handleProcessingEnd();
  };

  return (
    <div className="fade-in">
      {/* Способы ввода */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
          Как добавить еду?
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <button
            className={`btn ${
              activeInput === "photo" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveInput("photo")}
            style={{ padding: "12px", fontSize: "14px" }}
            disabled={isProcessing}
          >
            📷 Сфотографировать
          </button>

          <button
            className={`btn ${
              activeInput === "voice" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveInput("voice")}
            style={{ padding: "12px", fontSize: "14px" }}
            disabled={isProcessing}
          >
            🎤 Голосом
          </button>

          <button
            className={`btn ${
              activeInput === "text" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveInput("text")}
            style={{ padding: "12px", fontSize: "14px" }}
            disabled={isProcessing}
          >
            ✏️ Написать
          </button>

          <button
            className={`btn ${
              activeInput === "search" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveInput("search")}
            style={{ padding: "12px", fontSize: "14px" }}
            disabled={isProcessing}
          >
            🔍 Найти
          </button>
        </div>
      </div>

      {/* Индикатор обработки */}
      {isProcessing && (
        <div
          className="card"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "rgba(0, 122, 255, 0.1)",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
          <div
            style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}
          >
            Обрабатываем...
          </div>
          <div
            style={{ fontSize: "14px", color: "var(--secondary-text-color)" }}
          >
            Это может занять несколько секунд
          </div>
        </div>
      )}

      {/* Активный ввод */}
      {!isProcessing && (
        <div>
          {activeInput === "photo" && (
            <PhotoCapture
              onProcessingStart={handleProcessingStart}
              onFoodRecognized={handleFoodRecognized}
            />
          )}

          {activeInput === "text" && (
            <TextInput
              onProcessingStart={handleProcessingStart}
              onFoodRecognized={handleFoodRecognized}
            />
          )}

          {activeInput === "voice" && (
            <VoiceInput
              onProcessingStart={handleProcessingStart}
              onFoodRecognized={handleFoodRecognized}
            />
          )}

          {activeInput === "search" && <FoodSearch onFoodAdd={onFoodAdd} />}
        </div>
      )}
    </div>
  );
}

export default FoodInput;
