import React, { useState } from "react";
import { motion } from "framer-motion";
import StepWizard from "./StepWizard";
import AnimatedModal from "./AnimatedModal";
import AnimatedDropdown from "./AnimatedDropdown";

// Компоненты шагов
import Welcome from "./onboarding/Welcome";
import PersonalInfoStep from "./onboarding/PersonalInfoStep";
import BodyMetricsStep from "./onboarding/BodyMetricsStep";
import ActivityStep from "./onboarding/ActivityStep";
import GoalStep from "./onboarding/GoalStep";

// Определение шагов для wizard'а
const WIZARD_STEPS = [
  {
    title: "Добро пожаловать",
    shortTitle: "Старт",
    description: "Давайте начнем ваш путь к здоровому питанию",
    component: <Welcome />,
  },
  {
    title: "Личная информация",
    shortTitle: "Профиль",
    description: "Расскажите немного о себе",
    component: <PersonalInfoStep />,
  },
  {
    title: "Параметры тела",
    shortTitle: "Тело",
    description: "Укажите ваши физические параметры",
    component: <BodyMetricsStep />,
  },
  {
    title: "Уровень активности",
    shortTitle: "Активность",
    description: "Определим ваш уровень физической активности",
    component: <ActivityStep />,
  },
  {
    title: "Ваша цель",
    shortTitle: "Цель",
    description: "Что вы хотите достичь?",
    component: <GoalStep />,
  },
];

function Onboarding({ onComplete }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationStep, setRegistrationStep] = useState("login");
  const [profileData, setProfileData] = useState({
    gender: null,
    age: null,
    height: null,
    weight: null,
    activity: null,
    goal: null,
    name: "",
    email: "",
    preferences: [],
  });

  // Валидация шагов
  const validateStep = async (stepIndex, stepData) => {
    switch (stepIndex) {
      case 0: // Welcome
        return true;
      case 1: // Personal Info
        return stepData.gender && stepData.age && stepData.name;
      case 2: // Body Metrics
        return stepData.height && stepData.weight;
      case 3: // Activity
        return stepData.activity;
      case 4: // Goal
        return stepData.goal;
      default:
        return true;
    }
  };

  // Завершение процесса онбординга
  const handleComplete = (wizardData) => {
    // Объединяем данные из всех шагов
    const completeData = Object.keys(wizardData).reduce((acc, stepIndex) => {
      return { ...acc, ...wizardData[stepIndex] };
    }, {});

    setProfileData(completeData);

    // Показываем модальное окно регистрации
    setShowRegistrationModal(true);
  };

  // Финальная регистрация
  const handleFinalRegistration = (registrationData) => {
    const finalData = { ...profileData, ...registrationData };
    onComplete(finalData);
    setShowRegistrationModal(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Основной контейнер */}
      <motion.div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StepWizard
          steps={WIZARD_STEPS}
          onComplete={handleComplete}
          validateStep={validateStep}
          theme="dark"
          className="glass-card"
        />
      </motion.div>

      {/* Модальное окно регистрации */}
      <AnimatedModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        title="Завершение регистрации"
        size="medium"
        animationType="slide-up"
        closeOnBackdrop={false}
      >
        <RegistrationModal
          step={registrationStep}
          onStepChange={setRegistrationStep}
          onComplete={handleFinalRegistration}
          profileData={profileData}
        />
      </AnimatedModal>

      {/* Декоративные элементы фона */}
      <motion.div
        style={{
          position: "fixed",
          top: "10%",
          left: "-100px",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          position: "fixed",
          bottom: "20%",
          right: "-150px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255, 0, 122, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Компонент модального окна регистрации
const RegistrationModal = ({ step, onStepChange, onComplete, profileData }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    notifications: true,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (step === "login") {
      onStepChange("preferences");
    } else if (step === "preferences") {
      onComplete(formData);
    }
  };

  const notificationOptions = [
    {
      value: "daily_reminders",
      label: "Ежедневные напоминания",
      description: "Получать напоминания о приеме пищи",
      icon: "🔔",
    },
    {
      value: "weekly_reports",
      label: "Еженедельные отчеты",
      description: "Сводка по питанию за неделю",
      icon: "📊",
    },
    {
      value: "tips",
      label: "Полезные советы",
      description: "Советы по здоровому питанию",
      icon: "💡",
    },
  ];

  if (step === "login") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h3 style={{ color: "var(--text-color)", marginBottom: "8px" }}>
            Почти готово! 🎉
          </h3>
          <p style={{ color: "var(--secondary-text-color)", fontSize: "14px" }}>
            Создайте аккаунт, чтобы сохранить ваш прогресс
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <motion.input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "2px solid var(--border-color)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--text-color)",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            whileFocus={{
              borderColor: "var(--primary-color)",
              boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
            }}
          />

          <motion.input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "2px solid var(--border-color)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--text-color)",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            whileFocus={{
              borderColor: "var(--primary-color)",
              boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
            }}
          />

          <motion.input
            type="password"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "2px solid var(--border-color)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--text-color)",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            whileFocus={{
              borderColor: "var(--primary-color)",
              boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
            }}
          />

          <motion.label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text-color)",
              fontSize: "14px",
              cursor: "pointer",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) =>
                handleInputChange("agreeToTerms", e.target.checked)
              }
              style={{
                width: "18px",
                height: "18px",
                accentColor: "var(--primary-color)",
              }}
            />
            Согласен с условиями использования
          </motion.label>

          <motion.button
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #007AFF, #00D4FF)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px",
              boxShadow: "0 4px 16px rgba(0, 122, 255, 0.3)",
            }}
            whileHover={{
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(0, 122, 255, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword ||
              !formData.agreeToTerms
            }
          >
            Создать аккаунт
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h3 style={{ color: "var(--text-color)", marginBottom: "8px" }}>
          Настройте уведомления 🔔
        </h3>
        <p style={{ color: "var(--secondary-text-color)", fontSize: "14px" }}>
          Выберите, какие уведомления вы хотите получать
        </p>
      </div>

      <AnimatedDropdown
        options={notificationOptions}
        value={formData.notifications || []}
        onChange={(value) => handleInputChange("notifications", value)}
        placeholder="Выберите типы уведомлений"
        multiple={true}
        searchable={false}
      />

      <motion.button
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #007AFF, #00D4FF)",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "24px",
          boxShadow: "0 4px 16px rgba(0, 122, 255, 0.3)",
        }}
        whileHover={{
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0, 122, 255, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
      >
        Завершить регистрацию ✨
      </motion.button>
    </motion.div>
  );
};

export default Onboarding;
