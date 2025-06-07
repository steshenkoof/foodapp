import React, { useState, useRef } from "react";
import { recognizeImageFood } from "../../utils/foodRecognition";
import FoodConfirmation from "./FoodConfirmation";

function PhotoCapture({ onProcessingStart, onFoodRecognized }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [recognizedFood, setRecognizedFood] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = async (file) => {
    // Создаем URL для предварительного просмотра
    const imageUrl = URL.createObjectURL(file);
    setCapturedImage(imageUrl);

    onProcessingStart();

    try {
      // Распознаем еду на изображении
      const results = await recognizeImageFood(file);
      setRecognizedFood(results);
    } catch (error) {
      console.error("Ошибка распознавания:", error);
      alert("Ошибка при обработке изображения. Попробуйте еще раз.");
    }
  };

  const handleConfirm = (confirmedFood) => {
    onFoodRecognized(confirmedFood);
    resetState();
  };

  const handleCancel = () => {
    resetState();
  };

  const resetState = () => {
    setCapturedImage(null);
    setRecognizedFood(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Если есть распознанная еда, показываем экран подтверждения
  if (recognizedFood) {
    return (
      <FoodConfirmation
        image={capturedImage}
        recognizedFood={recognizedFood}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        source="photo"
      />
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
        📷 Сфотографируйте еду
      </h3>

      {capturedImage ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={capturedImage}
            alt="Захваченное изображение"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          />
          <div
            style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
          >
            Анализируем изображение...
          </div>
          <div
            style={{ fontSize: "14px", color: "var(--secondary-text-color)" }}
          >
            Используем ИИ для распознавания продуктов
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              border: "2px dashed var(--border-color)",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📸</div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Выберите фото еды
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--secondary-text-color)",
                marginBottom: "16px",
              }}
            >
              Мы распознаем продукты и оценим их вес
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            <button
              className="btn btn-primary"
              onClick={() => fileInputRef.current?.click()}
              style={{ fontSize: "16px", padding: "12px 24px" }}
            >
              📷 Выбрать фото
            </button>
          </div>

          <div
            style={{
              padding: "12px",
              backgroundColor: "rgba(0, 122, 255, 0.1)",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              💡 Советы для лучшего распознавания:
            </div>
            <div>• Сфотографируйте еду сверху или под углом</div>
            <div>• Убедитесь, что еда хорошо освещена</div>
            <div>• Поместите еду на контрастный фон</div>
            <div>• Избегайте слишком сложных композиций</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoCapture;
