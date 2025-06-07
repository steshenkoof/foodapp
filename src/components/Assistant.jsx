import React, { useState, useEffect } from "react";
import "../styles/Assistant.css";

const Assistant = ({
  foodEntries,
  calorieData,
  userProfile,
  isSubscribed,
  onNavigate,
}) => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const today = new Date().toDateString();
  const todayEntries = foodEntries.filter((entry) => entry.date === today);

  const totalNutrition = todayEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + (entry.calories || 0),
      protein: acc.protein + (entry.protein || 0),
      carbs: acc.carbs + (entry.carbs || 0),
      fat: acc.fat + (entry.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  useEffect(() => {
    generateAnalysis();
  }, [foodEntries, calorieData]);

  const generateAnalysis = () => {
    setIsLoading(true);

    // Симуляция анализа ИИ
    setTimeout(() => {
      const calorieDeficit =
        calorieData.dailyCalories - totalNutrition.calories;
      const proteinPercent =
        (totalNutrition.protein / calorieData.protein) * 100;
      const carbsPercent = (totalNutrition.carbs / calorieData.carbs) * 100;
      const fatPercent = (totalNutrition.fat / calorieData.fat) * 100;

      let recommendations = [];
      let status = "good";

      if (calorieDeficit > 500) {
        recommendations.push({
          type: "warning",
          text: `У вас значительный дефицит калорий (${Math.round(
            calorieDeficit
          )} ккал). Добавьте полезных продуктов.`,
          action: "Добавить калории",
        });
        status = "warning";
      } else if (calorieDeficit < -300) {
        recommendations.push({
          type: "error",
          text: `Превышение дневной нормы на ${Math.abs(
            Math.round(calorieDeficit)
          )} ккал. Будьте осторожнее с порциями.`,
          action: "Контролировать порции",
        });
        status = "error";
      }

      if (proteinPercent < 80) {
        recommendations.push({
          type: "info",
          text: "Недостаточно белка в рационе. Добавьте мясо, рыбу, яйца или бобовые.",
          action: "Добавить белок",
        });
      }

      if (carbsPercent > 120) {
        recommendations.push({
          type: "warning",
          text: "Много углеводов. Попробуйте заменить простые углеводы на сложные.",
          action: "Заменить углеводы",
        });
      }

      if (recommendations.length === 0) {
        recommendations.push({
          type: "success",
          text: "Отличная работа! Ваш рацион сбалансирован и соответствует целям.",
          action: "Продолжать в том же духе",
        });
      }

      setAnalysis({
        status,
        calorieDeficit,
        macroBalance: { proteinPercent, carbsPercent, fatPercent },
        recommendations,
        tips: generateTips(),
      });

      setIsLoading(false);
    }, 1500);
  };

  const generateTips = () => {
    const tips = [
      "💧 Не забывайте пить достаточно воды - 30-35 мл на кг веса тела",
      "🥗 Включайте овощи в каждый прием пищи для получения клетчатки",
      "⏰ Старайтесь есть регулярно, каждые 3-4 часа",
      "🏃‍♂️ Добавьте физическую активность для лучших результатов",
      "😴 Полноценный сон влияет на метаболизм и аппетит",
      "🥜 Перекусывайте орехами или фруктами вместо сладостей",
    ];

    return tips.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage("");

    // Симуляция ответа ассистента
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        text: response,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("калор")) {
      return `Ваша дневная норма: ${
        calorieData.dailyCalories
      } ккал. Сегодня потреблено: ${Math.round(
        totalNutrition.calories
      )} ккал. ${
        totalNutrition.calories < calorieData.dailyCalories
          ? `Остается ${Math.round(
              calorieData.dailyCalories - totalNutrition.calories
            )} ккал.`
          : "Норма превышена, будьте осторожнее с порциями."
      }`;
    }

    if (lowerQuestion.includes("белок")) {
      return `Ваша норма белка: ${Math.round(
        calorieData.protein
      )}г в день. Сегодня потреблено: ${Math.round(
        totalNutrition.protein
      )}г. Хорошие источники белка: курица, рыба, яйца, творог, бобовые.`;
    }

    if (lowerQuestion.includes("похуд")) {
      return "Для похудения важен дефицит калорий 300-500 ккал в день, сбалансированное питание и регулярная физическая активность. Не торопитесь - здоровое похудение 0.5-1 кг в неделю.";
    }

    if (
      lowerQuestion.includes("что съесть") ||
      lowerQuestion.includes("перекус")
    ) {
      return "Попробуйте: яблоко с орехами, греческий йогурт с ягодами, овощные палочки с хумусом, или кусочек цельнозернового хлеба с авокадо.";
    }

    return "Спасибо за вопрос! Я анализирую ваше питание и могу дать советы по калориям, макронутриентам, похудению и здоровым перекусам. Задайте более конкретный вопрос.";
  };

  return (
    <div className="assistant">
      <div className="assistant__header">
        <h1 className="assistant__title">🤖 Умный помощник</h1>
        <p className="assistant__subtitle">
          Персональные рекомендации по питанию
        </p>
      </div>

      {isLoading ? (
        <div className="assistant__loading">
          <div className="loading-spinner"></div>
          <p>Анализирую ваш рацион...</p>
        </div>
      ) : analysis ? (
        <div className="assistant__analysis">
          <div
            className={`analysis-status analysis-status--${analysis.status}`}
          >
            <div className="status-icon">
              {analysis.status === "good" && "✅"}
              {analysis.status === "warning" && "⚠️"}
              {analysis.status === "error" && "❌"}
            </div>
            <div className="status-text">
              <h3>Анализ рациона на сегодня</h3>
              <p>
                {analysis.calorieDeficit > 0
                  ? `Дефицит: ${Math.round(analysis.calorieDeficit)} ккал`
                  : `Превышение: ${Math.abs(
                      Math.round(analysis.calorieDeficit)
                    )} ккал`}
              </p>
            </div>
          </div>

          <div className="recommendations">
            <h3>Рекомендации</h3>
            {analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className={`recommendation recommendation--${rec.type}`}
              >
                <div className="rec-icon">
                  {rec.type === "success" && "🎉"}
                  {rec.type === "info" && "💡"}
                  {rec.type === "warning" && "⚠️"}
                  {rec.type === "error" && "🚨"}
                </div>
                <div className="rec-content">
                  <p>{rec.text}</p>
                  <span className="rec-action">{rec.action}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tips">
            <h3>💡 Полезные советы</h3>
            {analysis.tips.map((tip, index) => (
              <div key={index} className="tip">
                <span className="tip-text">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="assistant__chat">
        <h3>Задайте вопрос помощнику</h3>

        {!isSubscribed && (
          <div className="subscription-notice">
            <p>🔒 Чат с ИИ доступен в Premium версии</p>
            <button
              className="upgrade-btn"
              onClick={() => onNavigate("settings")}
            >
              Обновить до Premium
            </button>
          </div>
        )}

        {isSubscribed && (
          <>
            <div className="chat-messages">
              {chatMessages.length === 0 ? (
                <div className="chat-placeholder">
                  <p>Примеры вопросов:</p>
                  <div className="example-questions">
                    <button
                      className="example-btn"
                      onClick={() =>
                        setInputMessage("Сколько калорий мне осталось сегодня?")
                      }
                    >
                      Сколько калорий осталось?
                    </button>
                    <button
                      className="example-btn"
                      onClick={() => setInputMessage("Что съесть на перекус?")}
                    >
                      Что съесть на перекус?
                    </button>
                    <button
                      className="example-btn"
                      onClick={() => setInputMessage("Как правильно худеть?")}
                    >
                      Как правильно худеть?
                    </button>
                  </div>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-message chat-message--${message.type}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Напишите ваш вопрос..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="send-btn"
              >
                📤
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Assistant;
