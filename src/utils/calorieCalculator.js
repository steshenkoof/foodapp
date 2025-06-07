// Коэффициенты активности
export const ACTIVITY_LEVELS = {
  sedentary: {
    value: 1.2,
    label: "Сидячий образ жизни",
    description: "Мало или никаких упражнений",
  },
  light: {
    value: 1.375,
    label: "Легкая активность",
    description: "Легкие упражнения 1-3 дня в неделю",
  },
  moderate: {
    value: 1.55,
    label: "Умеренная активность",
    description: "Умеренные упражнения 3-5 дней в неделю",
  },
  high: {
    value: 1.725,
    label: "Высокая активность",
    description: "Интенсивные упражнения 6-7 дней в неделю",
  },
  extreme: {
    value: 1.9,
    label: "Очень высокая активность",
    description: "Очень интенсивные упражнения, физическая работа",
  },
};

// Цели по весу
export const WEIGHT_GOALS = {
  lose: {
    label: "Снижение веса",
    modifier: -500,
    description: "Потеря 0.5 кг в неделю",
  },
  maintain: {
    label: "Сохранение веса",
    modifier: 0,
    description: "Поддержание текущего веса",
  },
  gain: {
    label: "Набор веса",
    modifier: 500,
    description: "Набор 0.5 кг в неделю",
  },
};

/**
 * Расчет базового метаболизма по формуле Mifflin-St Jeor
 * @param {Object} profile - профиль пользователя
 * @returns {number} BMR в калориях
 */
export function calculateBMR(profile) {
  const { gender, age, height, weight } = profile;

  // Формула Mifflin-St Jeor
  // Мужчины: BMR = 10 × вес(кг) + 6.25 × рост(см) - 5 × возраст(лет) + 5
  // Женщины: BMR = 10 × вес(кг) + 6.25 × рост(см) - 5 × возраст(лет) - 161

  const bmr =
    10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);

  return Math.round(bmr);
}

/**
 * Расчет общего расхода энергии (TDEE)
 * @param {number} bmr - базовый метаболизм
 * @param {string} activityLevel - уровень активности
 * @returns {number} TDEE в калориях
 */
export function calculateTDEE(bmr, activityLevel) {
  const activityMultiplier = ACTIVITY_LEVELS[activityLevel].value;
  return Math.round(bmr * activityMultiplier);
}

/**
 * Расчет калорий с учетом цели
 * @param {number} tdee - общий расход энергии
 * @param {string} goal - цель по весу
 * @returns {number} целевые калории
 */
export function calculateTargetCalories(tdee, goal) {
  const goalModifier = WEIGHT_GOALS[goal].modifier;
  return Math.round(tdee + goalModifier);
}

/**
 * Основная функция расчета калорий
 * @param {Object} profile - профиль пользователя
 * @returns {Object} результат расчета
 */
export function calculateCalories(profile) {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activity);
  const targetCalories = calculateTargetCalories(tdee, profile.goal);

  return {
    bmr,
    tdee,
    targetCalories,
    goal: WEIGHT_GOALS[profile.goal],
    activity: ACTIVITY_LEVELS[profile.activity],
  };
}

/**
 * Расчет макронутриентов
 * @param {number} calories - целевые калории
 * @returns {Object} макронутриенты
 */
export function calculateMacros(calories) {
  // Стандартное распределение: 30% белки, 40% углеводы, 30% жиры
  const protein = Math.round((calories * 0.3) / 4); // 4 ккал на 1г белка
  const carbs = Math.round((calories * 0.4) / 4); // 4 ккал на 1г углеводов
  const fat = Math.round((calories * 0.3) / 9); // 9 ккал на 1г жиров

  return {
    protein: { grams: protein, calories: protein * 4 },
    carbs: { grams: carbs, calories: carbs * 4 },
    fat: { grams: fat, calories: fat * 9 },
  };
}
