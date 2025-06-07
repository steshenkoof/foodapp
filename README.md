# 🍽️ Cal AI - Telegram Mini App

> Умный помощник для подсчета калорий и анализа питания с искусственным интеллектом

![Cal AI Preview](https://via.placeholder.com/800x400/007AFF/FFFFFF?text=Cal+AI+Preview)

## 🌟 Особенности

### 📷 **Мгновенное распознавание еды**

- Сделайте фото блюда - ИИ определит продукты и калории
- Поддержка различных углов съемки и освещения
- Автоматическая оценка порций и веса

### 🎯 **4 способа ввода данных**

- **📷 Фото** - основной метод с ИИ-распознаванием
- **💬 Текст** - опишите блюдо естественным языком
- **🎤 Голос** - наговорите что съели
- **🔍 Поиск** - найдите в базе 50+ продуктов

### 🤖 **ИИ-помощник**

- Персональный анализ рациона
- Умные рекомендации по питанию
- Ответы на вопросы о здоровье
- Советы по достижению целей

### 📊 **Полная аналитика**

- Дневник питания с визуализацией
- Прогресс по калориям и БЖУ
- История за день/неделю/месяц
- Топ продуктов и статистика

### ⚙️ **Персонализация**

- Расчет нормы по формуле Mifflin-St Jeor
- Учет пола, возраста, роста, веса
- 5 уровней физической активности
- 3 цели: похудение/поддержание/набор

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонирование проекта
git clone https://github.com/yourusername/cal-ai-telegram
cd cal-ai-telegram

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

Откройте http://localhost:3000 в браузере

### Сборка для production

```bash
# Создание оптимизированной сборки
npm run build

# Предварительный просмотр
npm run preview
```

## 📱 Развертывание в Telegram

### 1. Создание бота

```bash
# Откройте @BotFather в Telegram
/newbot
# Имя: Cal AI Bot
# Username: your_cal_ai_bot
```

### 2. Настройка Web App

```bash
/mybots → Bot Settings → Menu Button
# Text: 🍽️ Cal AI
# URL: https://your-deployed-url.com
```

### 3. Варианты хостинга

#### Vercel (рекомендуется)

```bash
npm install -g vercel
npm run deploy:vercel
```

#### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy:gh
```

#### Netlify

Перетащите папку `dist` в Netlify Dashboard

## 🛠️ Технологии

### Frontend

- **React 18** - современный UI фреймворк
- **Vite** - сверхбыстрая сборка
- **CSS Variables** - адаптация к Telegram темам
- **LocalStorage** - сохранение данных

### Telegram Integration

- **Telegram WebApp SDK** - нативная интеграция
- **Main/Back Button** - управление навигацией
- **Theme Parameters** - автоматическая тема
- **Telegram Payments** - готовность к монетизации

### AI & APIs (готово к интеграции)

- **OpenAI GPT** - для улучшения ИИ-помощника
- **YOLOv8/CLIP** - реальное распознавание еды
- **Food API** - расширенная база продуктов
- **Speech API** - распознавание речи

## 📁 Структура проекта

```
src/
├── components/
│   ├── onboarding/          # Настройка профиля (5 шагов)
│   ├── food/               # Система ввода еды (4 метода)
│   ├── Navigation.jsx      # Нижняя навигация (6 экранов)
│   ├── CalorieResult.jsx   # Главная с результатами
│   ├── DaySummary.jsx      # Дневник питания
│   ├── Assistant.jsx       # ИИ-помощник
│   ├── History.jsx         # Аналитика и история
│   └── Settings.jsx        # Настройки и подписка
├── utils/
│   ├── calorieCalculator.js # Формула Mifflin-St Jeor
│   ├── foodDatabase.js     # База продуктов
│   └── foodRecognition.js  # ИИ симуляция
├── styles/                 # CSS модули
└── App.jsx                # Основное приложение
```

## 🎨 Дизайн-система

### Цвета (Telegram адаптация)

```css
--tg-theme-bg-color: #ffffff
--tg-theme-text-color: #000000
--tg-theme-button-color: #007aff
--tg-theme-hint-color: #8e8e93
```

### Компоненты

- Карточки с закругленными углами (16px)
- Прогресс-бары с анимацией
- Кнопки с состояниями hover/active
- Адаптивная сетка для мобильных

## 📊 Функциональность

### ✅ Реализовано

- [x] Полный онбординг с расчетом калорий
- [x] 4 метода ввода еды (фото/текст/голос/поиск)
- [x] ИИ-помощник с анализом рациона
- [x] Дневник питания с прогрессом
- [x] История и аналитика
- [x] Настройки профиля и подписка
- [x] Telegram WebApp интеграция
- [x] Адаптивный дизайн

### 🔄 В разработке

- [ ] Реальное API распознавания еды
- [ ] Интеграция с OpenAI
- [ ] Система уведомлений
- [ ] Синхронизация с фитнес-трекерами

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменений (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. [LICENSE](LICENSE) файл.

## 📞 Поддержка

- 🐛 **Баги**: [GitHub Issues](https://github.com/yourusername/cal-ai-telegram/issues)
- 💬 **Вопросы**: [Telegram](https://t.me/your_cal_ai_support)
- 📧 **Email**: support@calai.app

---

<div align="center">

**[🚀 Демо](https://your-demo-url.com)** • **[📱 Telegram Bot](https://t.me/your_cal_ai_bot)** • **[📖 Документация](https://docs.calai.app)**

Made with ❤️ for healthy living

</div>
