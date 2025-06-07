import React, { useState } from "react";
import "../styles/Settings.css";

const Settings = ({
  userProfile,
  isSubscribed,
  onProfileUpdate,
  onSubscribe,
  onReset,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  const handleSave = () => {
    onProfileUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(false);
  };

  const handleSubscribe = () => {
    // Симуляция оплаты через Telegram Payments
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup(
        {
          title: "Cal AI Premium",
          message:
            "Получите доступ к расширенной аналитике, ИИ-помощнику и безлимитным функциям за 299₽/месяц",
          buttons: [
            { id: "subscribe", type: "default", text: "Подписаться" },
            { id: "cancel", type: "cancel", text: "Отмена" },
          ],
        },
        (buttonId) => {
          if (buttonId === "subscribe") {
            onSubscribe();
            window.Telegram.WebApp.showAlert("Подписка успешно оформлена! 🎉");
          }
        }
      );
    } else {
      onSubscribe();
    }
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: "Недостаточный вес", color: "#007aff" };
    if (bmi < 25) return { text: "Нормальный вес", color: "#34c759" };
    if (bmi < 30) return { text: "Избыточный вес", color: "#ff9500" };
    return { text: "Ожирение", color: "#ff3b30" };
  };

  const bmi = calculateBMI(userProfile.weight, userProfile.height);
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="settings">
      <div className="settings__header">
        <h1 className="settings__title">⚙️ Настройки</h1>
      </div>

      {/* Профиль пользователя */}
      <div className="settings__section">
        <div className="section-header">
          <h2>👤 Профиль</h2>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Изменить
            </button>
          )}
        </div>

        <div className="profile-card">
          {isEditing ? (
            <div className="profile-form">
              <div className="form-group">
                <label>Пол</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="male"
                      checked={editedProfile.gender === "male"}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          gender: e.target.value,
                        })
                      }
                    />
                    Мужской
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="female"
                      checked={editedProfile.gender === "female"}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          gender: e.target.value,
                        })
                      }
                    />
                    Женский
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Возраст</label>
                  <input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        age: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="120"
                  />
                </div>
                <div className="form-group">
                  <label>Рост (см)</label>
                  <input
                    type="number"
                    value={editedProfile.height}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        height: parseInt(e.target.value),
                      })
                    }
                    min="100"
                    max="250"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Вес (кг)</label>
                <input
                  type="number"
                  value={editedProfile.weight}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      weight: parseInt(e.target.value),
                    })
                  }
                  min="30"
                  max="300"
                />
              </div>

              <div className="form-group">
                <label>Уровень активности</label>
                <select
                  value={editedProfile.activity}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      activity: e.target.value,
                    })
                  }
                >
                  <option value="sedentary">Малоподвижный</option>
                  <option value="light">Легкая активность</option>
                  <option value="moderate">Умеренная активность</option>
                  <option value="active">Высокая активность</option>
                  <option value="very_active">Очень высокая активность</option>
                </select>
              </div>

              <div className="form-group">
                <label>Цель</label>
                <select
                  value={editedProfile.goal}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, goal: e.target.value })
                  }
                >
                  <option value="lose">Похудение</option>
                  <option value="maintain">Поддержание веса</option>
                  <option value="gain">Набор массы</option>
                </select>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  Сохранить
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-label">Пол</span>
                  <span className="stat-value">
                    {userProfile.gender === "male" ? "Мужской" : "Женский"}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Возраст</span>
                  <span className="stat-value">{userProfile.age} лет</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Рост</span>
                  <span className="stat-value">{userProfile.height} см</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Вес</span>
                  <span className="stat-value">{userProfile.weight} кг</span>
                </div>
              </div>

              <div className="bmi-info">
                <div className="bmi-value">
                  <span className="bmi-number">{bmi.toFixed(1)}</span>
                  <span className="bmi-label">ИМТ</span>
                </div>
                <div
                  className="bmi-category"
                  style={{ color: bmiCategory.color }}
                >
                  {bmiCategory.text}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Подписка */}
      <div className="settings__section">
        <h2>💎 Подписка</h2>

        {isSubscribed ? (
          <div className="subscription-active">
            <div className="subscription-status">
              <span className="status-icon">✅</span>
              <div className="status-text">
                <h3>Cal AI Premium активна</h3>
                <p>У вас есть доступ ко всем функциям</p>
              </div>
            </div>

            <div className="premium-features">
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <span>ИИ-помощник</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Расширенная аналитика</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Подробные отчеты</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">☁️</span>
                <span>Синхронизация данных</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="subscription-offer">
            <div className="offer-header">
              <h3>Получите больше возможностей</h3>
              <div className="price">
                299₽<span className="price-period">/месяц</span>
              </div>
            </div>

            <div className="offer-features">
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <span>Персональный ИИ-помощник</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Детальная аналитика питания</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Графики и отчеты</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Персональные рекомендации</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">☁️</span>
                <span>Резервное копирование данных</span>
              </div>
            </div>

            <button className="subscribe-btn" onClick={handleSubscribe}>
              Подписаться на Premium
            </button>
          </div>
        )}
      </div>

      {/* Прочие настройки */}
      <div className="settings__section">
        <h2>🔧 Прочее</h2>

        <div className="settings-list">
          <button
            className="settings-item"
            onClick={() => onNavigate("assistant")}
          >
            <span className="settings-icon">🤖</span>
            <div className="settings-text">
              <span className="settings-title">Помощник</span>
              <span className="settings-desc">Получить совет по питанию</span>
            </div>
            <span className="settings-arrow">›</span>
          </button>

          <button
            className="settings-item"
            onClick={() => onNavigate("history")}
          >
            <span className="settings-icon">📈</span>
            <div className="settings-text">
              <span className="settings-title">История</span>
              <span className="settings-desc">Просмотр аналитики</span>
            </div>
            <span className="settings-arrow">›</span>
          </button>

          <div className="settings-item settings-item--danger">
            <span className="settings-icon">🗑️</span>
            <div className="settings-text">
              <span className="settings-title">Сбросить данные</span>
              <span className="settings-desc">
                Удалить все данные приложения
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings__danger-zone">
        <button
          className="reset-btn"
          onClick={() => {
            if (
              window.confirm(
                "Вы уверены? Все данные будут удалены безвозвратно."
              )
            ) {
              onReset();
            }
          }}
        >
          🗑️ Сбросить все данные
        </button>
      </div>

      <div className="settings__footer">
        <p>Cal AI v1.0.0</p>
        <p>Аналог популярного приложения для подсчета калорий</p>
      </div>
    </div>
  );
};

export default Settings;
