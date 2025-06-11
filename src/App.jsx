import React, { useState, useEffect } from "react";
import Onboarding from "./components/Onboarding";
import CalorieResult from "./components/CalorieResult";
import FoodTracker from "./components/FoodTracker";
import DaySummary from "./components/DaySummary";
import Assistant from "./components/Assistant";
import History from "./components/History";
import Settings from "./components/Settings";
import Navigation from "./components/Navigation";
import AnimatedScreen from "./components/AnimatedScreen";
import ParticleBackground from "./components/ParticleBackground";
import { calculateCalories } from "./utils/calorieCalculator";

function App() {
  const [currentScreen, setCurrentScreen] = useState("onboarding"); // onboarding | results | food | summary | assistant | history | settings
  const [userProfile, setUserProfile] = useState(null);
  const [calorieData, setCalorieData] = useState(null);
  const [foodEntries, setFoodEntries] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Инициализация Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Адаптация к теме Telegram
      tg.setHeaderColor(tg.themeParams.bg_color || "#ffffff");
      tg.setBackgroundColor(tg.themeParams.bg_color || "#ffffff");

      // Настройка Main Button
      tg.MainButton.setParams({
        text: "Продолжить",
        is_visible: false,
      });

      // Обработка событий Telegram
      tg.onEvent("mainButtonClicked", handleMainButtonClick);
      tg.onEvent("backButtonClicked", handleBackButtonClick);
    }

    // Загрузка сохраненных данных
    loadUserData();
  }, []);

  // Обновление Main Button в зависимости от экрана
  useEffect(() => {
    updateMainButton();
  }, [currentScreen, userProfile]);

  const loadUserData = () => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      const savedEntries = localStorage.getItem("foodEntries");
      const savedSubscription = localStorage.getItem("isSubscribed");

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        setCalorieData(calculateCalories(profile));
        setCurrentScreen("results");
      }

      if (savedEntries) {
        setFoodEntries(JSON.parse(savedEntries));
      }

      if (savedSubscription) {
        setIsSubscribed(JSON.parse(savedSubscription));
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const saveUserData = (profile, entries) => {
    try {
      if (profile) {
        localStorage.setItem("userProfile", JSON.stringify(profile));
      }
      if (entries) {
        localStorage.setItem("foodEntries", JSON.stringify(entries));
      }
    } catch (error) {
      console.error("Ошибка сохранения данных:", error);
    }
  };

  const updateMainButton = () => {
    if (!window.Telegram?.WebApp) return;

    const tg = window.Telegram.WebApp;

    switch (currentScreen) {
      case "onboarding":
        tg.MainButton.hide();
        break;
      case "results":
        tg.MainButton.setParams({
          text: "📷 Добавить еду",
          is_visible: true,
        });
        break;
      case "food":
        tg.MainButton.hide();
        break;
      default:
        tg.MainButton.hide();
    }
  };

  const handleMainButtonClick = () => {
    switch (currentScreen) {
      case "results":
        setCurrentScreen("food");
        break;
      default:
        break;
    }
  };

  const handleBackButtonClick = () => {
    switch (currentScreen) {
      case "food":
      case "summary":
      case "assistant":
      case "history":
      case "settings":
        setCurrentScreen("results");
        break;
      default:
        break;
    }
  };

  const handleOnboardingComplete = (profileData) => {
    const calories = calculateCalories(profileData);
    setUserProfile(profileData);
    setCalorieData(calories);
    setCurrentScreen("results");
    saveUserData(profileData, foodEntries);
  };

  const handleFoodAdd = (newEntries) => {
    const entriesWithId = newEntries.map((entry) => ({
      ...entry,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      date: new Date().toDateString(),
    }));
    const updatedEntries = [...foodEntries, ...entriesWithId];
    setFoodEntries(updatedEntries);
    saveUserData(userProfile, updatedEntries);
    setCurrentScreen("summary");
  };

  const handleFoodEdit = (id, updatedEntry) => {
    const updatedEntries = foodEntries.map((entry) =>
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    );
    setFoodEntries(updatedEntries);
    saveUserData(userProfile, updatedEntries);
  };

  const handleFoodDelete = (id) => {
    const updatedEntries = foodEntries.filter((entry) => entry.id !== id);
    setFoodEntries(updatedEntries);
    saveUserData(userProfile, updatedEntries);
  };

  const handleReset = () => {
    setUserProfile(null);
    setCalorieData(null);
    setFoodEntries([]);
    setCurrentScreen("onboarding");
    localStorage.clear();
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    localStorage.setItem("isSubscribed", JSON.stringify(true));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <Onboarding onComplete={handleOnboardingComplete} />;

      case "results":
        return (
          <CalorieResult
            calorieData={calorieData}
            userProfile={userProfile}
            onReset={handleReset}
            onNavigate={setCurrentScreen}
          />
        );

      case "food":
        return (
          <FoodTracker
            userProfile={userProfile}
            calorieData={calorieData}
            onFoodAdd={handleFoodAdd}
            onBack={() => setCurrentScreen("results")}
          />
        );

      case "summary":
        return (
          <DaySummary
            foodEntries={foodEntries}
            calorieData={calorieData}
            userProfile={userProfile}
            onEdit={handleFoodEdit}
            onDelete={handleFoodDelete}
            onNavigate={setCurrentScreen}
          />
        );

      case "assistant":
        return (
          <Assistant
            foodEntries={foodEntries}
            calorieData={calorieData}
            userProfile={userProfile}
            isSubscribed={isSubscribed}
            onNavigate={setCurrentScreen}
          />
        );

      case "history":
        return (
          <History
            foodEntries={foodEntries}
            userProfile={userProfile}
            isSubscribed={isSubscribed}
            onNavigate={setCurrentScreen}
          />
        );

      case "settings":
        return (
          <Settings
            userProfile={userProfile}
            isSubscribed={isSubscribed}
            onProfileUpdate={(newProfile) => {
              setUserProfile(newProfile);
              setCalorieData(calculateCalories(newProfile));
              saveUserData(newProfile, foodEntries);
            }}
            onSubscribe={handleSubscribe}
            onReset={handleReset}
            onNavigate={setCurrentScreen}
          />
        );

      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  const shouldShowNavigation = currentScreen !== "onboarding" && userProfile;

  return (
    <div className="container">
      <ParticleBackground
        particleCount={30}
        opacity={0.4}
        size={{ min: 1, max: 4 }}
        speed={{ min: 15, max: 30 }}
      />

      <AnimatedScreen screenKey={currentScreen}>
        {renderScreen()}
      </AnimatedScreen>

      {shouldShowNavigation && (
        <Navigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          foodEntriesCount={
            foodEntries.filter(
              (entry) => entry.date === new Date().toDateString()
            ).length
          }
        />
      )}
    </div>
  );
}

export default App;
