// База данных продуктов питания (на основе USDA и других источников)
// Калории и БЖУ указаны на 100г продукта

export const FOOD_DATABASE = {
  // Молочные продукты
  молоко: {
    name: "Молоко 3.2%",
    category: "Молочные продукты",
    calories: 60,
    protein: 2.9,
    carbs: 4.7,
    fat: 3.2,
    fiber: 0,
    emoji: "🥛",
  },
  творог: {
    name: "Творог обезжиренный",
    category: "Молочные продукты",
    calories: 72,
    protein: 18,
    carbs: 1.3,
    fat: 0.6,
    fiber: 0,
    emoji: "🧀",
  },
  йогурт: {
    name: "Йогурт натуральный",
    category: "Молочные продукты",
    calories: 60,
    protein: 4.3,
    carbs: 6.2,
    fat: 1.5,
    fiber: 0,
    emoji: "🥛",
  },
  сыр: {
    name: "Сыр твердый",
    category: "Молочные продукты",
    calories: 350,
    protein: 25,
    carbs: 0,
    fat: 27,
    fiber: 0,
    emoji: "🧀",
  },

  // Мясо и рыба
  "куриная грудка": {
    name: "Куриная грудка без кожи",
    category: "Мясо и птица",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    emoji: "🍗",
  },
  говядина: {
    name: "Говядина постная",
    category: "Мясо и птица",
    calories: 187,
    protein: 26,
    carbs: 0,
    fat: 9,
    fiber: 0,
    emoji: "🥩",
  },
  лосось: {
    name: "Лосось",
    category: "Рыба и морепродукты",
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 12,
    fiber: 0,
    emoji: "🐟",
  },
  тунец: {
    name: "Тунец в собственном соку",
    category: "Рыба и морепродукты",
    calories: 132,
    protein: 29,
    carbs: 0,
    fat: 1,
    fiber: 0,
    emoji: "🐟",
  },

  // Злаки и крупы
  овсянка: {
    name: "Овсяные хлопья",
    category: "Злаки и крупы",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    emoji: "🥣",
  },
  гречка: {
    name: "Гречневая крупа",
    category: "Злаки и крупы",
    calories: 343,
    protein: 13.3,
    carbs: 62.1,
    fat: 3.4,
    fiber: 11.3,
    emoji: "🌾",
  },
  рис: {
    name: "Рис белый",
    category: "Злаки и крупы",
    calories: 365,
    protein: 7,
    carbs: 78,
    fat: 1,
    fiber: 3,
    emoji: "🍚",
  },
  киноа: {
    name: "Киноа",
    category: "Злаки и крупы",
    calories: 368,
    protein: 14.1,
    carbs: 57.2,
    fat: 6.1,
    fiber: 7,
    emoji: "🌾",
  },

  // Овощи
  брокколи: {
    name: "Брокколи",
    category: "Овощи",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    fiber: 2.6,
    emoji: "🥦",
  },
  помидор: {
    name: "Помидоры",
    category: "Овощи",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    emoji: "🍅",
  },
  огурец: {
    name: "Огурцы",
    category: "Овощи",
    calories: 16,
    protein: 0.7,
    carbs: 4.1,
    fat: 0.1,
    fiber: 1,
    emoji: "🥒",
  },
  морковь: {
    name: "Морковь",
    category: "Овощи",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    emoji: "🥕",
  },
  картофель: {
    name: "Картофель",
    category: "Овощи",
    calories: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
    fiber: 2.2,
    emoji: "🥔",
  },

  // Фрукты
  яблоко: {
    name: "Яблоко",
    category: "Фрукты",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    fiber: 2.4,
    emoji: "🍎",
  },
  банан: {
    name: "Банан",
    category: "Фрукты",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    emoji: "🍌",
  },
  апельсин: {
    name: "Апельсин",
    category: "Фрукты",
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1,
    fiber: 2.4,
    emoji: "🍊",
  },
  авокадо: {
    name: "Авокадо",
    category: "Фрукты",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    emoji: "🥑",
  },

  // Орехи и семена
  миндаль: {
    name: "Миндаль",
    category: "Орехи и семена",
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    emoji: "🥜",
  },
  "грецкий орех": {
    name: "Грецкий орех",
    category: "Орехи и семена",
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fat: 65.2,
    fiber: 6.7,
    emoji: "🥜",
  },
  "семена чиа": {
    name: "Семена чиа",
    category: "Орехи и семена",
    calories: 486,
    protein: 16.5,
    carbs: 42.1,
    fat: 30.7,
    fiber: 34.4,
    emoji: "🌱",
  },

  // Яйца
  яйцо: {
    name: "Куриное яйцо",
    category: "Яйца",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    emoji: "🥚",
  },

  // Хлеб и выпечка
  хлеб: {
    name: "Хлеб цельнозерновой",
    category: "Хлеб и выпечка",
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 4.2,
    fiber: 7,
    emoji: "🍞",
  },

  // Готовые блюда
  борщ: {
    name: "Борщ с мясом",
    category: "Готовые блюда",
    calories: 49,
    protein: 2.6,
    carbs: 5.5,
    fat: 1.8,
    fiber: 1.8,
    emoji: "🍲",
  },
  плов: {
    name: "Плов с мясом",
    category: "Готовые блюда",
    calories: 218,
    protein: 8.7,
    carbs: 24.9,
    fat: 9.8,
    fiber: 0.4,
    emoji: "🍚",
  },
  "салат цезарь": {
    name: "Салат Цезарь",
    category: "Готовые блюда",
    calories: 190,
    protein: 7,
    carbs: 8,
    fat: 15,
    fiber: 2,
    emoji: "🥗",
  },
  "пицца маргарита": {
    name: "Пицца Маргарита",
    category: "Готовые блюда",
    calories: 266,
    protein: 12,
    carbs: 33,
    fat: 10,
    fiber: 2.3,
    emoji: "🍕",
  },
};

// Категории продуктов
export const FOOD_CATEGORIES = {
  "Молочные продукты": { emoji: "🥛", color: "#E3F2FD" },
  "Мясо и птица": { emoji: "🍗", color: "#FFF3E0" },
  "Рыба и морепродукты": { emoji: "🐟", color: "#E0F2F1" },
  "Злаки и крупы": { emoji: "🌾", color: "#FFF8E1" },
  Овощи: { emoji: "🥬", color: "#E8F5E8" },
  Фрукты: { emoji: "🍎", color: "#FCE4EC" },
  "Орехи и семена": { emoji: "🥜", color: "#F3E5F5" },
  Яйца: { emoji: "🥚", color: "#FFF3E0" },
  "Хлеб и выпечка": { emoji: "🍞", color: "#EFEBE9" },
  "Готовые блюда": { emoji: "🍽️", color: "#F5F5F5" },
};

// Функция поиска продуктов
export function searchFood(query) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return [];

  const results = [];

  for (const [key, food] of Object.entries(FOOD_DATABASE)) {
    const score = calculateMatchScore(searchTerm, key, food.name.toLowerCase());
    if (score > 0) {
      results.push({
        key,
        ...food,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

// Функция расчета релевантности
function calculateMatchScore(query, key, name) {
  let score = 0;

  // Точное совпадение ключа
  if (key === query) score += 100;

  // Начинается с запроса
  if (key.startsWith(query)) score += 80;
  if (name.startsWith(query)) score += 70;

  // Содержит запрос
  if (key.includes(query)) score += 60;
  if (name.includes(query)) score += 50;

  // Частичное совпадение слов
  const queryWords = query.split(" ");
  const keyWords = key.split(" ");
  const nameWords = name.split(" ");

  queryWords.forEach((qWord) => {
    keyWords.forEach((kWord) => {
      if (kWord.includes(qWord) || qWord.includes(kWord)) score += 30;
    });
    nameWords.forEach((nWord) => {
      if (nWord.includes(qWord) || qWord.includes(nWord)) score += 20;
    });
  });

  return score;
}
