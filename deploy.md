# 🚀 Развертывание Cal AI в Telegram

## Этап 1: Подготовка к деплою

### 📦 Сборка приложения

```bash
npm run build
```

### 🌐 Варианты хостинга

#### A) GitHub Pages (бесплатно)

```bash
npm install --save-dev gh-pages
```

Добавить в `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/cal-ai-telegram",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### B) Vercel (рекомендуется)

```bash
npm install -g vercel
vercel --prod
```

#### C) Netlify

Перетащить папку `dist` в Netlify Dashboard

## Этап 2: Настройка в Telegram

### 🤖 Создание бота

1. Открыть [@BotFather](https://t.me/botfather)
2. Отправить `/newbot`
3. Указать имя: `Cal AI Bot`
4. Указать username: `cal_ai_bot` (должен быть уникальным)

### 🌐 Настройка Web App

1. Отправить `/mybots` в BotFather
2. Выбрать ваш бот
3. Нажать `Bot Settings` → `Menu Button`
4. Выбрать `Configure Menu Button`
5. Указать:
   - **Text**: `🍽️ Cal AI`
   - **URL**: `https://your-deployed-url.com`

### ⚙️ Дополнительные настройки

```
/setdescription - Умный помощник для подсчета калорий с ИИ
/setabouttext - Анализируйте питание, отслеживайте калории и получайте персональные рекомендации
/setuserpic - (загрузить иконку приложения)
```

## Этап 3: Тестирование

### ✅ Проверить функции:

- [ ] Онбординг (5 шагов)
- [ ] Добавление еды (фото/текст/голос/поиск)
- [ ] Навигация между экранами
- [ ] Telegram WebApp API (кнопки, тема)
- [ ] Сохранение данных в localStorage

### 📱 Тестовые устройства:

- iPhone (Safari)
- Android (Chrome)
- Desktop (Telegram Web)

## Этап 4: Публикация

### 🔐 Получение API токенов (для production):

1. **OpenAI API** - для ИИ-помощника
2. **Food API** - для базы продуктов
3. **Telegram Bot Token** - для интеграции

### 💳 Настройка платежей:

```
/mybots → Bot Settings → Payments
- Добавить провайдера (Stripe/ЮKassa)
- Настроить валюту (RUB)
```

## Готовые URL для настройки:

### Development:

```
http://localhost:3002
```

### Production (заменить на ваш домен):

```
https://your-app.vercel.app
https://yourusername.github.io/cal-ai-telegram
```

## 🔧 Файлы конфигурации:

- `telegram-webapp.json` - манифест для Telegram
- `vite.config.js` - настройки сборки
- `package.json` - зависимости и скрипты

## 📋 Чек-лист перед запуском:

- [ ] Приложение собирается без ошибок
- [ ] Все компоненты работают локально
- [ ] URL хостинга настроен
- [ ] Бот создан в BotFather
- [ ] Menu Button настроена
- [ ] Протестированы основные функции
- [ ] Telegram WebApp API работает

## 🎯 Следующие шаги после деплоя:

1. **Сбор метрик** - добавить Google Analytics
2. **Реальные API** - подключить OpenAI, Food Database
3. **Push уведомления** - напоминания о еде
4. **Расширения** - интеграция с фитнес-трекерами
5. **Маркетинг** - продвижение в Telegram каналах
