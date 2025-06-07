import React from "react";
import "../styles/Navigation.css";

const Navigation = ({ currentScreen, onNavigate, foodEntriesCount }) => {
  const navItems = [
    {
      id: "results",
      icon: "🏠",
      label: "Главная",
      screen: "results",
    },
    {
      id: "food",
      icon: "📷",
      label: "Добавить",
      screen: "food",
    },
    {
      id: "summary",
      icon: "📊",
      label: "Дневник",
      screen: "summary",
      badge: foodEntriesCount > 0 ? foodEntriesCount : null,
    },
    {
      id: "assistant",
      icon: "🤖",
      label: "Помощник",
      screen: "assistant",
    },
    {
      id: "history",
      icon: "📈",
      label: "История",
      screen: "history",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Настройки",
      screen: "settings",
    },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              currentScreen === item.screen ? "nav-item--active" : ""
            }`}
            onClick={() => onNavigate(item.screen)}
          >
            <div className="nav-icon">
              {item.icon}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
