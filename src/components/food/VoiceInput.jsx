import React, { useState, useRef } from "react";
import { processVoiceInput } from "../../utils/foodRecognition";
import FoodConfirmation from "./FoodConfirmation";

function VoiceInput({ onProcessingStart, onFoodRecognized }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedFood, setRecognizedFood] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        audioChunks.current = [];

        onProcessingStart();

        try {
          const results = await processVoiceInput(audioBlob);
          setRecognizedFood(results);
        } catch (error) {
          console.error("Ошибка обработки голоса:", error);
          alert("Ошибка при обработке голосового ввода. Попробуйте еще раз.");
        }

        // Останавливаем все треки
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Ошибка доступа к микрофону:", error);
      alert("Не удалось получить доступ к микрофону. Проверьте разрешения.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleConfirm = (confirmedFood) => {
    onFoodRecognized(confirmedFood);
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
        source="voice"
      />
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
        🎤 Расскажите что съели
      </h3>

      <div style={{ textAlign: "center", padding: "20px" }}>
        {isRecording ? (
          <div>
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            >
              🔴
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Идет запись...
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--secondary-text-color)",
                marginBottom: "20px",
              }}
            >
              Говорите четко и не торопясь
            </div>
            <button
              className="btn btn-secondary"
              onClick={stopRecording}
              style={{ fontSize: "16px", padding: "12px 24px" }}
            >
              ⏹️ Остановить запись
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎤</div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Нажмите и расскажите
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--secondary-text-color)",
                marginBottom: "20px",
              }}
            >
              Например: "Съел 200 грамм куриной грудки и рис"
            </div>
            <button
              className="btn btn-primary"
              onClick={startRecording}
              style={{ fontSize: "16px", padding: "12px 24px" }}
            >
              🎤 Начать запись
            </button>
          </div>
        )}
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
          💡 Советы для записи:
        </div>
        <div>• Говорите в тихом месте</div>
        <div>• Четко произносите названия продуктов</div>
        <div>• Указывайте вес: "двести грамм курицы"</div>
        <div>• Можно перечислить несколько продуктов</div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default VoiceInput;
