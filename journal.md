# Журнал разработки — AI Predict Arena (AIPA)

Здесь фиксируется весь прогресс рефакторинга и разработки проекта по шагам (итерациям). Каждая запись описывает выполненную работу, текущий статус системы и следующие запланированные шаги.

---

### [2026-06-03] Итерация 1: Инициализация проекта и агентной документации
* **Статус**: Выполнено.
* **Описание изменений**:
  - Согласовано название нового бренда: **AI Predict Arena** (AIPA).
  - Выбрана архитектура базы данных: переход на единую базу **Supabase (PostgreSQL)** и полный отказ от MongoDB.
  - Разработана новая дизайн-палитра (Neon Violet / Cyan) с сохранением стиля глассморфизма.
  - Утвержден план рефакторинга проекта на 9 итераций.
  - Создана базовая документация для ИИ-агентов в корне проекта:
    - [agent.md](file:///D:/MyCoin/agent.md) — правила кодирования, приватности коммитов и поведения.
    - [design.md](file:///D:/MyCoin/design.md) — спецификация новой дизайн-системы, токенов и стилей.
    - [CONCEPT.md](file:///D:/MyCoin/ai-predict-arena/CONCEPT.md) — концепция ИИ-песочницы прогнозов и новостного оракула.
  - Настроен файл [.gitignore](file:///D:/MyCoin/ai-predict-arena/.gitignore) для предотвращения утечки конфиденциальных данных.
  - Создан локальный файл [secrets.json](file:///D:/MyCoin/ai-predict-arena/secrets.json) (прописан в `.gitignore`), в который сохранен сгенерированный пароль от базы данных Supabase. Документ [agent.md](file:///D:/MyCoin/ai-predict-arena/agent.md) обновлен с инструкциями по использованию этого файла агентами.
* **Текущий статус**: Документация и среда безопасности полностью настроены. Проект успешно отправлен на GitHub. Планировщик задач дополнен фазой разработки UI Kit и ранним деплоем статической оболочки.

### [2026-06-03] Итерация 2: Разработка UI-Kit и Визуальный дизайн (AIPA)
* **Статус**: Выполнено.
* **Описание изменений**:
  - Проведен полный технический аудит стилей, переменных, шрифтов и брейкпоинтов оригинального кода `mycoin-webapp-v2` и `mycoin-admin-webapp-v2`.
  - Все спецификации и правила оформления (включая запрет emoji, шрифтовую шкалу Space Grotesk / Space Mono, стили неоморфизма) задокументированы в файле [design.md](file:///D:/MyCoin/ai-predict-arena/design.md).
  - Созданы файлы [ui-kit.html](file:///D:/MyCoin/ai-predict-arena/ui-kit.html) и [ui-kit-dark.html](file:///D:/MyCoin/ai-predict-arena/ui-kit-dark.html) (объемом ~100 КБ каждый), содержащие полную интерактивную библиотеку оригинальных UI-компонентов (кнопки, формы ввода, карточки прогнозов, таблицы, модальные окна, уведомления).
* **Текущий статус**: Дизайн-библиотека готова. Документ [CONCEPT.md](file:///D:/MyCoin/ai-predict-arena/CONCEPT.md) расширен детальным описанием поведения ИИ-агентов (хеджирование рисков, чат/дебаты между ботами под карточками событий и личные дневники трейдинга).

### [2026-06-03] Итерация 3: Первая живая страница и Стрим-Экран в сети
* **Статус**: Выполнено.
* **Описание изменений**:
  - Инициализирован Next.js проект `aipa-webapp` с TypeScript, Tailwind CSS v4, Framer Motion и Phosphor Icons.
  - Сверстан главный дашборд пользователя ([page.tsx](file:///D:/MyCoin/ai-predict-arena/aipa-webapp/src/app/page.tsx)) со списком прогнозов, графиками и боковым меню.
  - Сверстан Stream Overlay экран ([stream/page.tsx](file:///D:/MyCoin/ai-predict-arena/aipa-webapp/src/app/stream/page.tsx)) для интеграции в OBS, отображающий дебаты и трансляцию ставок ботов.
  - Устранена ошибка сборки TypeScript/Turbopack, связанная с импортом отсутствующей иконки `Activity` (заменена на `Pulse`).
  - Проект подготовлен к бесплатному деплою на Cloudflare Pages через добавление опции `output: "export"` в [next.config.ts](file:///D:/MyCoin/ai-predict-arena/aipa-webapp/next.config.ts), что генерирует статический HTML/JS/CSS при сборке.
  - Все файлы успешно закоммичены и отправлены в GitHub-репозиторий `zoomzip2000/ai-predict-arena` на ветку `main`.
* **Текущий статус**: Первая веха полностью закрыта. Статический интерфейс и live-HUD готовы к развертыванию.
* **Следующий шаг**: Развертывание и модульный рефакторинг фронтенда (aipa-webapp, aipa-admin, aipa-tapbot-front).

### [2026-06-03] Итерация 4: Перенос главной страницы WebApp (1 в 1) и сброс темы на Light Mode
* **Статус**: Выполнено.
* **Описание изменений**:
  - Активирован Light Mode (светлая тема) по умолчанию: класс `light` добавлен в корневой тег `<html>` в [layout.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/app/layout.tsx), и состояние переключателя в [Header.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/layout/Header.tsx) выставлено в `"light"`.
  - Скопированы все изображения и медиа-ресурсы из `mycoin-webapp-v2/public` в `aipa-webapp/public/` для сохранения 1-в-1 верстки.
  - Созданы новые чистые TSX-компоненты: [MainBanner.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/home/MainBanner.tsx), [CategoryList.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/home/CategoryList.tsx), [Partners.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/home/Partners.tsx), [EventCard.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/home/EventCard.tsx).
  - Все логические хуки, вычисления и форматирование дат вынесены в [useEventCard.ts](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/hooks/useEventCard.ts) (до 100 строк).
  - Картинки событий выведены через модульный [GetImageComponent.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/ui/GetImageComponent.tsx).
  - Полностью переписана [page.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/app/page.tsx) главной страницы WebApp, убрав двухколоночный дашборд и вернув 1-в-1 верстку оригинального MyCoin (Баннер, категории, карточки событий, партнеры, HowItWorks и Benefits).
  - Добавлена оффлайн-заглушка с mock-событиями в [useActiveEvents.ts](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/hooks/useActiveEvents.ts) на случай ошибок API/CORS, чтобы страница загружалась стабильно.
  - Проект `aipa-webapp` успешно собирается (`npm run build`) без ошибок типов TypeScript и Next.js.
  - Создан подробный глобальный план [task.md](file:///d:/MyCoin/ai-predict-arena/task.md) в корне `ai-predict-arena` по микро-менеджменту всего фронтенда (клиент, мобилка, админка, Telegram Mini App).
* **Текущий статус**: Светлая тема установлена по умолчанию. Главная страница WebApp полностью воссоздана 1-в-1 с модульным разделением кода. Проект компилируется успешно.
* **Следующий шаг**: Раздел 1 Шаг 3 плана — перенос недостающих страниц экосистемы (О нас, Правила, Безопасность, Комиссии, Отчеты) и мобильная адаптивность меню.
