import React from "react";
import DailyProgress from "./food/DailyProgress";
import FoodList from "./food/FoodList";
import "../styles/DaySummary.css";

const DaySummary = ({
  foodEntries,
  calorieData,
  userProfile,
  onEdit,
  onDelete,
  onNavigate,
}) => {
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="day-summary">
      <div className="day-summary__header">
        <h1 className="day-summary__title">📊 Дневник питания</h1>
        <p className="day-summary__date">{formatDate(new Date())}</p>
      </div>

      <div className="day-summary__progress">
        <DailyProgress
          consumed={totalNutrition}
          targets={calorieData}
          showDetails={true}
        />
      </div>

      <div className="day-summary__actions">
        <button
          className="day-summary__action-btn day-summary__action-btn--primary"
          onClick={() => onNavigate("food")}
        >
          <span className="action-icon">📷</span>
          Добавить еду
        </button>
        <button
          className="day-summary__action-btn"
          onClick={() => onNavigate("assistant")}
        >
          <span className="action-icon">🤖</span>
          Получить совет
        </button>
      </div>

      <div className="day-summary__content">
        {todayEntries.length > 0 ? (
          <>
            <div className="day-summary__section-header">
              <h2>Приемы пищи сегодня</h2>
              <span className="day-summary__count">
                {todayEntries.length}{" "}
                {todayEntries.length === 1 ? "прием" : "приемов"}
              </span>
            </div>
            <FoodList
              entries={todayEntries}
              onEdit={onEdit}
              onDelete={onDelete}
              showDate={false}
            />
          </>
        ) : (
          <div className="day-summary__empty">
            <div className="empty-state">
              <div className="empty-state__icon">🍽️</div>
              <h3 className="empty-state__title">Еще нет записей на сегодня</h3>
              <p className="empty-state__description">
                Добавьте первый прием пищи, чтобы начать отслеживать питание
              </p>
              <button
                className="empty-state__button"
                onClick={() => onNavigate("food")}
              >
                📷 Добавить еду
              </button>
            </div>
          </div>
        )}
      </div>

      {todayEntries.length > 0 && (
        <div className="day-summary__stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Калории</span>
              <span className="stat-value">
                {Math.round(totalNutrition.calories)} /{" "}
                {calorieData.dailyCalories}
              </span>
              <span className="stat-unit">ккал</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Белки</span>
              <span className="stat-value">
                {Math.round(totalNutrition.protein)} /{" "}
                {Math.round(calorieData.protein)}
              </span>
              <span className="stat-unit">г</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Углеводы</span>
              <span className="stat-value">
                {Math.round(totalNutrition.carbs)} /{" "}
                {Math.round(calorieData.carbs)}
              </span>
              <span className="stat-unit">г</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Жиры</span>
              <span className="stat-value">
                {Math.round(totalNutrition.fat)} / {Math.round(calorieData.fat)}
              </span>
              <span className="stat-unit">г</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySummary;
