import React, { useState, useMemo } from "react";
import FoodList from "./food/FoodList";
import "../styles/History.css";

const History = ({ foodEntries, userProfile, isSubscribed, onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periodOptions = [
    { value: "day", label: "День" },
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
  ];

  const getDateRange = (period) => {
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case "day":
        return {
          start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        };
      case "week":
        const dayOfWeek = now.getDay();
        startDate.setDate(now.getDate() - dayOfWeek);
        return {
          start: new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          ),
          end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        };
      case "month":
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        };
      default:
        return { start: new Date(), end: new Date() };
    }
  };

  const filteredEntries = useMemo(() => {
    const { start, end } = getDateRange(selectedPeriod);
    return foodEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });
  }, [foodEntries, selectedPeriod]);

  const analytics = useMemo(() => {
    if (filteredEntries.length === 0) {
      return {
        totalCalories: 0,
        avgCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        daysWithData: 0,
        topFoods: [],
      };
    }

    const totalCalories = filteredEntries.reduce(
      (sum, entry) => sum + (entry.calories || 0),
      0
    );
    const totalProtein = filteredEntries.reduce(
      (sum, entry) => sum + (entry.protein || 0),
      0
    );
    const totalCarbs = filteredEntries.reduce(
      (sum, entry) => sum + (entry.carbs || 0),
      0
    );
    const totalFat = filteredEntries.reduce(
      (sum, entry) => sum + (entry.fat || 0),
      0
    );

    const uniqueDays = new Set(filteredEntries.map((entry) => entry.date)).size;
    const avgCalories = uniqueDays > 0 ? totalCalories / uniqueDays : 0;

    // Топ продуктов
    const foodCounts = {};
    filteredEntries.forEach((entry) => {
      const name = entry.name || "Неизвестно";
      foodCounts[name] = (foodCounts[name] || 0) + 1;
    });

    const topFoods = Object.entries(foodCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return {
      totalCalories: Math.round(totalCalories),
      avgCalories: Math.round(avgCalories),
      totalProtein: Math.round(totalProtein),
      totalCarbs: Math.round(totalCarbs),
      totalFat: Math.round(totalFat),
      daysWithData: uniqueDays,
      topFoods,
    };
  }, [filteredEntries]);

  const groupedEntries = useMemo(() => {
    const groups = {};
    filteredEntries.forEach((entry) => {
      const date = entry.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(entry);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b) - new Date(a))
      .map(([date, entries]) => ({
        date,
        entries,
        totalCalories: entries.reduce(
          (sum, entry) => sum + (entry.calories || 0),
          0
        ),
      }));
  }, [filteredEntries]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateString === today) return "Сегодня";
    if (dateString === yesterday) return "Вчера";

    return new Intl.DateTimeFormat("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <div className="history">
      <div className="history__header">
        <h1 className="history__title">📈 История питания</h1>
        <div className="period-selector">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              className={`period-btn ${
                selectedPeriod === option.value ? "period-btn--active" : ""
              }`}
              onClick={() => setSelectedPeriod(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {!isSubscribed && (
        <div className="premium-notice">
          <div className="premium-content">
            <h3>🔒 Расширенная аналитика</h3>
            <p>Получите доступ к подробной статистике, графикам и отчетам</p>
            <button
              className="upgrade-btn"
              onClick={() => onNavigate("settings")}
            >
              Обновить до Premium
            </button>
          </div>
        </div>
      )}

      <div className="history__analytics">
        <h2>
          Статистика за{" "}
          {periodOptions
            .find((p) => p.value === selectedPeriod)
            ?.label.toLowerCase()}
        </h2>

        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="card-icon">🔥</div>
            <div className="card-content">
              <h3>{analytics.totalCalories}</h3>
              <p>Всего калорий</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>{analytics.avgCalories}</h3>
              <p>Среднее в день</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-icon">💪</div>
            <div className="card-content">
              <h3>{analytics.totalProtein}г</h3>
              <p>Белки</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-icon">🍞</div>
            <div className="card-content">
              <h3>{analytics.totalCarbs}г</h3>
              <p>Углеводы</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-icon">🥑</div>
            <div className="card-content">
              <h3>{analytics.totalFat}г</h3>
              <p>Жиры</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-icon">📅</div>
            <div className="card-content">
              <h3>{analytics.daysWithData}</h3>
              <p>Дней с данными</p>
            </div>
          </div>
        </div>

        {analytics.topFoods.length > 0 && (
          <div className="top-foods">
            <h3>🏆 Топ продуктов</h3>
            <div className="top-foods-list">
              {analytics.topFoods.map((food, index) => (
                <div key={food.name} className="top-food-item">
                  <span className="food-rank">#{index + 1}</span>
                  <span className="food-name">{food.name}</span>
                  <span className="food-count">{food.count} раз</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="history__entries">
        <h2>История записей</h2>

        {groupedEntries.length === 0 ? (
          <div className="history__empty">
            <div className="empty-state">
              <div className="empty-state__icon">📝</div>
              <h3>Нет данных за выбранный период</h3>
              <p>Начните добавлять еду, чтобы увидеть историю</p>
              <button
                className="empty-state__button"
                onClick={() => onNavigate("food")}
              >
                📷 Добавить еду
              </button>
            </div>
          </div>
        ) : (
          <div className="entries-by-date">
            {groupedEntries.map(({ date, entries, totalCalories }) => (
              <div key={date} className="date-group">
                <div className="date-header">
                  <h3>{formatDate(date)}</h3>
                  <span className="date-calories">
                    {Math.round(totalCalories)} ккал
                  </span>
                </div>
                <FoodList entries={entries} showDate={false} readonly={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
