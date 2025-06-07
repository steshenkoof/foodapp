import React, { useState } from "react";
import { parseTextFood } from "../../utils/foodRecognition";
import FoodConfirmation from "./FoodConfirmation";

function TextInput({ onProcessingStart, onFoodRecognized }) {
  const [textInput, setTextInput] = useState("");
  const [recognizedFood, setRecognizedFood] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    onProcessingStart();

    try {
      const results = await parseTextFood(textInput);
      setRecognizedFood(results);
    } catch (error) {
      console.error("Ошибка обработки текста:", error);
      alert("Ошибка при обработке текста. Попробуйте еще раз.");
    }
  };

  const handleConfirm = (confirmedFood) => {
    onFoodRecognized(confirmedFood);
    setTextInput("");
    setRecognizedFood(null);
  };

  const handleCancel = () => {
    setRecognizedFood(null);
  };

  if (recognizedFood) {
    return (
      <FoodConfirmation
        recognizedFood={recognizedFood}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        source="text"
        originalText={textInput}
      />
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
        ✏️ Опишите что съели
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Расскажите о еде</label>
          <textarea
            className="form-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Например: 200 грамм куриной грудки, 150 грамм риса, салат из помидоров"
            rows="4"
            style={{ resize: "vertical", minHeight: "100px" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!textInput.trim()}
          style={{ fontSize: "16px" }}
        >
          🔍 Найти продукты
        </button>
      </form>

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          backgroundColor: "rgba(0, 122, 255, 0.1)",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <div style={{ fontWeight: "600", marginBottom: "4px" }}>
          💡 Как лучше описать:
        </div>
        <div>• Указывайте вес: "200г куриной грудки"</div>
        <div>• Используйте точные названия продуктов</div>
        <div>• Можно писать несколько продуктов</div>
        <div>• Например: "100г творога, банан, 50г орехов"</div>
      </div>
    </div>
  );
}

export default TextInput;
