# School Frontend

Современное веб-приложение для образовательной платформы, разработанное с использованием React и TypeScript.

## 🚀 Технологии

- React 19
- TypeScript
- Vite
- React Router DOM
- SASS
- React Icons
- React Transition Group

## 📋 Предварительные требования

- Node.js (версия 18 или выше)
- npm (версия 9 или выше)

## 🛠 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/art-crazy/school-frontend.git
cd school-frontend
```

2. Установите зависимости:
```bash
npm install
```

## 🚀 Разработка

Запуск проекта в режиме разработки:
```bash
npm run dev
```

## 📦 Сборка

Сборка проекта для продакшена:
```bash
npm run build
```

Предпросмотр собранного проекта:
```bash
npm run preview
```

## 🧪 Проверка кода

Запуск линтера:
```bash
npm run lint
```

## 📁 Структура проекта

```
src/
├── assets/        # Статические ресурсы
├── components/    # Переиспользуемые компоненты
├── fonts/         # Шрифты
├── pages/         # Страницы приложения
├── shared/        # Общие компоненты и утилиты
├── styles/        # Глобальные стили
└── widgets/       # Виджеты приложения
```

## 🎨 Компоненты

- `Header` - Шапка приложения с авторизацией
- `Footer` - Подвал приложения
- `HeroSection` - Главная секция
- `ServicesSection` - Секция услуг
- `LearningPlanSection` - Секция плана обучения
- `ContactCard` - Карточка контактов
- `ScrollToTop` - Кнопка прокрутки вверх
- `Layout` - Основной макет приложения

## 🔄 CI/CD и окружения

Проект использует GitHub Actions для автоматизации сборки и деплоя.

### 🧪 Stage-окружения

При пуше в любую ветку, кроме master, автоматически создаётся тестовое окружение на поддомене вида:

```
https://<branch_name>.mentor-hub.ru/
```

Все символы `/` в названии ветки удаляются.

**Пример:** ветка `feature/itschool-4/dark_mode` будет доступна по адресу:
```
https://featureitschool-4dark_mode.mentor-hub.ru/
```

Окружение доступно в течение 48 часов. После этого оно автоматически удаляется.

Чтобы повторно активировать окружение, необходимо перезапустить pipeline в GitHub Actions вручную.

### 🚀 Продакшн

Слияние в master возможно только через Pull Request.

После слияния автоматически выполняется деплой на основной продакшн-домен:
```
https://mentor-hub.ru/
```

## 👁️ Sentry

Проект использует Sentry для отслеживания ошибок в dev-режиме и на stage-окружениях.

Файл инициализации Sentry находится в `src/shared/instrument.ts` и подключается в `src/main.tsx`

Вся информация об ошибках доступна в веб-интерфейсе Sentry:
```
https://mentor-hub.sentry.io/
```

## 📚 API Документация

Документация API доступна через Swagger UI по адресу:
```
https://mentor-hub.ru/api/docs
```

## 📝 Лицензия

MIT

## 👥 Команда

- [Art Crazy](https://github.com/art-crazy) - Maintainer
- [MalenkoZloy](https://github.com/MalenkoZloy) - Developer
