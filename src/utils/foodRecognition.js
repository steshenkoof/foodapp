import { searchFood } from "../data/foodDatabase";

// Заглушка для распознавания изображений (YOLOv8 + CLIP)
export async function recognizeImageFood(imageFile) {
  // Имитация обработки изображения
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Заглушка результатов распознавания
  const mockResults = [
    {
      food: "яблоко",
      confidence: 0.92,
      weight: 180,
      boundingBox: { x: 10, y: 10, width: 200, height: 200 },
    },
    {
      food: "банан",
      confidence: 0.87,
      weight: 120,
      boundingBox: { x: 250, y: 50, width: 150, height: 180 },
    },
  ];

  // В реальной реализации здесь был бы вызов:
  // const response = await fetch('YOUR_YOLO_API_ENDPOINT', {
  //   method: 'POST',
  //   body: formData
  // })

  return mockResults.map((result) => ({
    ...result,
    foodData: searchFood(result.food)[0], // Получаем данные из базы
  }));
}

// Обработка текстового ввода с помощью NLP/GPT-4
export async function parseTextFood(text) {
  // Имитация обработки текста
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Простой парсинг для демонстрации
  const mockAnalysis = analyzeTextLocally(text);

  // В реальной реализации здесь был бы вызов к GPT-4:
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4',
  //     messages: [{
  //       role: 'user',
  //       content: `Проанализируй этот текст о еде и извлеки продукты с весом: "${text}"`
  //     }]
  //   })
  // })

  return mockAnalysis;
}

// Локальный анализ текста (упрощенная версия)
function analyzeTextLocally(text) {
  const normalizedText = text.toLowerCase();
  const results = [];

  // Паттерны для поиска еды и веса
  const foodPatterns = [
    /(\d+)\s*г\s+([\w\s]+)/g,
    /(\d+)\s*гр\s+([\w\s]+)/g,
    /(\d+)\s*грамм\s+([\w\s]+)/g,
    /([\w\s]+)\s+(\d+)\s*г/g,
    /([\w\s]+)\s+(\d+)\s*гр/g,
  ];

  let match;

  // Поиск по паттернам
  foodPatterns.forEach((pattern) => {
    while ((match = pattern.exec(normalizedText)) !== null) {
      const weight = parseInt(match[1]) || parseInt(match[2]);
      const foodName = (match[2] || match[1]).trim();

      if (weight && weight > 0 && weight < 2000) {
        const foodResults = searchFood(foodName);
        if (foodResults.length > 0) {
          results.push({
            food: foodName,
            weight,
            confidence: 0.8,
            foodData: foodResults[0],
          });
        }
      }
    }
  });

  // Если не найдено по паттернам, ищем просто по названиям
  if (results.length === 0) {
    const words = normalizedText.split(/\s+/);
    words.forEach((word) => {
      if (word.length > 2) {
        const foodResults = searchFood(word);
        if (foodResults.length > 0) {
          results.push({
            food: word,
            weight: 100, // Вес по умолчанию
            confidence: 0.6,
            foodData: foodResults[0],
          });
        }
      }
    });
  }

  return results.slice(0, 5); // Максимум 5 результатов
}

// Обработка голосового ввода
export async function processVoiceInput(audioBlob) {
  // Имитация распознавания речи
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // В реальной реализации здесь был бы вызов к Speech-to-Text API:
  // const formData = new FormData()
  // formData.append('audio', audioBlob)
  // const response = await fetch('YOUR_SPEECH_TO_TEXT_API', {
  //   method: 'POST',
  //   body: formData
  // })

  // Заглушка распознанного текста
  const mockTranscription = "200 грамм куриной грудки и 150 грамм риса";

  // Парсим распознанный текст
  return parseTextFood(mockTranscription);
}

// Оценка веса продукта по размеру
export function estimateWeight(food, size = "medium") {
  const weightEstimates = {
    // Фрукты
    яблоко: { small: 150, medium: 180, large: 220 },
    банан: { small: 100, medium: 120, large: 150 },
    апельсин: { small: 130, medium: 160, large: 200 },

    // Овощи
    помидор: { small: 80, medium: 120, large: 180 },
    огурец: { small: 100, medium: 150, large: 200 },
    морковь: { small: 60, medium: 100, large: 150 },
    картофель: { small: 80, medium: 150, large: 250 },

    // Готовые блюда (порции)
    плов: { small: 200, medium: 300, large: 400 },
    борщ: { small: 250, medium: 350, large: 450 },
    "салат цезарь": { small: 150, medium: 200, large: 300 },
  };

  const estimates = weightEstimates[food.toLowerCase()];
  return estimates ? estimates[size] : 100;
}

// Функция для получения подсказок по весу
export function getWeightSuggestions(foodKey) {
  const suggestions = {
    яблоко: [
      { label: "Маленькое яблоко", weight: 150 },
      { label: "Среднее яблоко", weight: 180 },
      { label: "Большое яблоко", weight: 220 },
    ],
    банан: [
      { label: "Маленький банан", weight: 100 },
      { label: "Средний банан", weight: 120 },
      { label: "Большой банан", weight: 150 },
    ],
    "куриная грудка": [
      { label: "Порция 100г", weight: 100 },
      { label: "Порция 150г", weight: 150 },
      { label: "Порция 200г", weight: 200 },
    ],
    рис: [
      { label: "Гарнир (сухой)", weight: 50 },
      { label: "Порция (сухой)", weight: 80 },
      { label: "Большая порция (сухой)", weight: 120 },
    ],
  };

  return (
    suggestions[foodKey] || [
      { label: "50г", weight: 50 },
      { label: "100г", weight: 100 },
      { label: "150г", weight: 150 },
      { label: "200г", weight: 200 },
    ]
  );
}
