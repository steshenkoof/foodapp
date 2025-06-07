import React, { useState } from "react";
import Welcome from "./onboarding/Welcome";
import GenderAge from "./onboarding/GenderAge";
import HeightWeight from "./onboarding/HeightWeight";
import Activity from "./onboarding/Activity";
import Goal from "./onboarding/Goal";

const STEPS = [
  { key: "welcome", title: "Добро пожаловать" },
  { key: "gender-age", title: "Основные данные" },
  { key: "height-weight", title: "Параметры тела" },
  { key: "activity", title: "Активность" },
  { key: "goal", title: "Цель" },
];

function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    gender: null,
    age: null,
    height: null,
    weight: null,
    activity: null,
    goal: null,
  });

  const handleNext = (stepData) => {
    const newProfileData = { ...profileData, ...stepData };
    setProfileData(newProfileData);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newProfileData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const renderStep = () => {
    const stepKey = STEPS[currentStep].key;

    switch (stepKey) {
      case "welcome":
        return <Welcome onNext={handleNext} />;
      case "gender-age":
        return (
          <GenderAge
            data={profileData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "height-weight":
        return (
          <HeightWeight
            data={profileData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "activity":
        return (
          <Activity
            data={profileData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "goal":
        return (
          <Goal data={profileData} onNext={handleNext} onBack={handleBack} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fade-in"
      style={{ minHeight: "100vh", paddingTop: "20px", paddingBottom: "20px" }}
    >
      {/* Прогресс-бар */}
      {currentStep > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Индикатор шагов */}
      {currentStep > 0 && (
        <div className="step-indicator">
          {STEPS.slice(1).map((step, index) => (
            <div
              key={step.key}
              className={`step ${
                index + 1 < currentStep
                  ? "completed"
                  : index + 1 === currentStep
                  ? "active"
                  : ""
              }`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* Текущий шаг */}
      {renderStep()}
    </div>
  );
}

export default Onboarding;
