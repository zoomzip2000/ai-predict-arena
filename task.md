# Глобальный план разработки фронтенда: AIPA WebApp, Admin & Tapbot

Полный чек-лист пошагового переноса и рефакторинга всей фронтенд-экосистемы проекта из оригинальных подпапок (`mycoin-webapp-v2`, `mycoin-admin-webapp-v2`, `mycoin-tapbot-front`) в новый монорепозиторий `ai-predict-arena`.

---

## 🌐 ПОДПРОЕКТ 1: Клиентское приложение (ai-predict-arena/aipa-webapp)
**Цель**: Перенести и адаптировать пользовательские интерфейсы с разделением на ПК/Мобильные версии и лимитом в 500 строк.

### 📋 Пошаговый план переноса:

#### 1. Инициализация и настройки темы
- [x] **1.1. Активация Light Mode по умолчанию**
  - **Что сделать**: В [layout.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/app/layout.tsx) на строке 30 добавить класс `light` к тегу `<html>`. (Выполнено)
  - **Что сделать**: В [Header.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/components/layout/Header.tsx) изменить начальное состояние `useState` темы на `"light"`. (Выполнено)
- [x] **1.2. Проверка копирования медиа-ресурсов**
  - **Что сделать**: Убедиться, что все изображения из `mycoin-webapp-v2/public/img` и иконки из `mycoin-webapp-v2/public/icon` перенесены в соответствующие папки `aipa-webapp/public/` (Выполнено).

#### 2. Главная страница (Index)
- [x] **2.1. Перенос промо-баннера (MainBanner)**
  - **Откуда**: [mycoin-webapp-v2/sections/MainBanner/index.js](file:///d:/MyCoin/mycoin-webapp-v2/sections/MainBanner/index.js)
  - **Куда**: `aipa-webapp/src/components/home/MainBanner.tsx` (Выполнено)
  - **Как резать**: Перенести верстку в чистый TSX-компонент. Заменить `FormattedMessage` на `t` из локального хука `useTranslation()`. Фоновое изображение привязать через инлайновый стиль со ссылкой на `/img/heroSphere.png`. (Выполнено)
- [x] **2.2. Перенос списка категорий (CategoryList)**
  - **Откуда**: [mycoin-webapp-v2/components/CategoryList/index.tsx](file:///d:/MyCoin/mycoin-webapp-v2/components/CategoryList/index.tsx)
  - **Куда**: `aipa-webapp/src/components/home/CategoryList.tsx` (Выполнено)
  - **Как резать**: Сделать плитку категорий выпуклой по стилю светлого нейморфизма. Контейнеры выстроить по сетке CSS Grid. (Выполнено)
- [x] **2.3. Создание блока партнеров (Partners)**
  - **Откуда**: CSS из [Home.module.scss](file:///d:/MyCoin/mycoin-webapp-v2/styles/Home.module.scss) (строки 88-141)
  - **Куда**: `aipa-webapp/src/components/home/Partners.tsx` (Выполнено)
  - **Как резать**: Сверстать логотип `partner2.png` в адаптивном блоке (ширина 359px на ПК, 158px на мобильном) со ссылкой на `https://datami.ua/`. (Выполнено)
- [x] **2.4. Рефакторинг карточки событий (EventCard)**
  - **Откуда**: [mycoin-webapp-v2/components/Card/index.js](file:///d:/MyCoin/mycoin-webapp-v2/components/Card/index.js)
  - **Куда**: `aipa-webapp/src/components/home/EventCard.tsx` (Выполнено)
  - **Как резать (лимит 500 строк)**:
    - Выделить анимацию изменения коэффициентов и форматирование дат в отдельный хук `src/hooks/useEventCard.ts` (до 150 строк). (Выполнено)
    - Картинку выводить через `GetImageComponent` (отдельный мини-файл в `src/components/ui/GetImageComponent.tsx`). (Выполнено)
    - Исключить модалки создания ставок из тела карточки. (Выполнено)
- [x] **2.5. Настройка главной страницы**
  - **Куда**: [aipa-webapp/src/app/page.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/app/page.tsx) (Выполнено)
  - **Как сделать**: Заменить двухколоночный дашборд на последовательный импорт: Layout -> MainBanner -> CategoryList -> Event Grid (из `EventCard`) -> Partners -> HowItWork -> Benefits. (Выполнено)
  - **Оффлайн-заглушка**: Добавить мок-данные событий в `useActiveEvents.ts` при ошибках загрузки API, чтобы избежать пустого экрана. (Выполнено)

#### 3. Мобильная адаптивность (Mobile Navigation)
- [x] **3.1. Создание HeaderMobile**
  - **Откуда**: [mycoin-webapp-v2/components/HeaderMobile](file:///d:/MyCoin/mycoin-webapp-v2/components/HeaderMobile)
  - **Куда**: `aipa-webapp/src/components/layout/HeaderMobile.tsx`
  - **Как сделать**: Реализовать выдвижное меню (Drawer) с отображением линков и языкового тумблера, скрывающееся на ПК.

#### 4. Касса и Кошелек (Cashier & Withdrawal)
- [ ] **4.1. Разделение DepositWithdrawModals**
  - **Откуда**: [mycoin-webapp-v2/components/CustomModal](file:///d:/MyCoin/mycoin-webapp-v2/components/CustomModal)
  - **Куда**: `aipa-webapp/src/components/ui/DepositWithdrawModals.tsx` (уже создан, убедиться в декомпозиции на `UsdtDepositModal`, `WithdrawUsdtModal` и т.д., чтобы размер файла не превышал 500 строк).
- [ ] **4.2. Проверка стейта в useWithdrawal.ts**
  - **Куда**: `aipa-webapp/src/hooks/useWithdrawal.ts` (уже создан, контролировать логику 2FA и ПИН-кодов).

#### 5. Терминал Опционов (Binary Options)
- [ ] **5.1. Модульное разделение экрана торговли**
  - **Откуда**: [mycoin-webapp-v2/pages/binary-options/index.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/binary-options)
  - **Куда**:
    - [ ] `aipa-webapp/src/components/binary-options/OptionChart.tsx` — интеграция графиков `lightweight-charts` из `binance-candle-chart` (до 200 строк).
    - [ ] `aipa-webapp/src/components/binary-options/OptionBetPanel.tsx` — панель кнопок Call/Put и выбора сумм ставок.
    - [ ] `aipa-webapp/src/components/binary-options/OptionPositions.tsx` — список открытых позиций с таймером.
    - [ ] [binary-options/page.tsx](file:///d:/MyCoin/ai-predict-arena/aipa-webapp/src/app/binary-options/page.tsx) — чистая сетка-макет, импортирующая эти 3 компонента.

#### 6. Статические страницы
- [x] **6.1. О нас**: Создать `src/app/about-us/page.tsx` на базе [aboutUs.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/aboutUs.js). (Выполнено)
- [x] **6.2. Правила**: Создать `src/app/rules/page.tsx` на базе [rules.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/rules.js). (Выполнено)
- [x] **6.3. Безопасность**: Создать `src/app/safety/page.tsx` на базе [safety.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/safety.js). (Выполнено)
- [x] **6.4. Комиссии**: Создать `src/app/commissions/page.tsx` на базе [commissions.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/commissions.js). (Выполнено)
- [x] **6.5. Отчеты**: Создать `src/app/activity-reports/page.tsx` на базе [activity-reports.js](file:///d:/MyCoin/mycoin-webapp-v2/pages/activity-reports.js). (Выполнено)

---

## 🛡️ ПОДПРОЕКТ 2: Панель Администратора (ai-predict-arena/aipa-admin)
**Цель**: Развернуть новое Vite/React/TS-приложение и перенести модули управления, не превышая 500 строк на файл.

### 📋 Пошаговый план переноса:

#### 1. Настройка и инициализация
- [x] **1.1. Инициализация Vite проекта**
  - **Что сделать**: Создать папку `ai-predict-arena/aipa-admin`. (Выполнено)
  - **Что сделать**: Запустить `npm create vite@latest . -- --template react-ts` в созданной папке. (Выполнено)
  - **Что сделать**: Установить базовые библиотеки: `@reduxjs/toolkit`, `react-redux`, `react-router-dom`, `@phosphor-icons/react`, `sass`, `bootstrap`, `react-bootstrap`. (Выполнено)
- [x] **1.2. Базовая сетка макета (Layout)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/containers/Layout`
  - **Куда**: `aipa-admin/src/components/layout/AdminLayout.tsx` (Выполнено)
  - **Как сделать**: Реализовать левую панель меню (Sidebar) и верхнюю панель управления. (Выполнено)

#### 2. Перенос страниц с рефакторингом (лимит 500 строк)
- [x] **2.1. Авторизация (Login)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/Login`
  - **Куда**: `aipa-admin/src/pages/Login.tsx` (Выполнено)
- [x] **2.2. Страница пользователей (Users)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/Users`
  - **Куда**: `aipa-admin/src/pages/Users.tsx` (Выполнено)
  - **Как резать**: Вынести логику фильтрации, пагинации и отправки запросов в хук `useUsers.ts`. Всю таблицу рендерить в `Users.tsx`. (Выполнено)
- [x] **2.3. Изменение балансов (EditBalance)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/EditBalance`
  - **Куда**: `aipa-admin/src/components/users/EditBalanceModal.tsx` (Выполнено)
- [x] **2.4. Управление Событиями (Events)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/Events`
  - **Куда**:
    - [x] `aipa-admin/src/pages/EventsList.tsx` — таблица существующих предсказаний. (Выполнено)
    - [x] `aipa-admin/src/components/events/CreateEventModal.tsx` — модальное окно добавления события. (Выполнено)
    - [x] `aipa-admin/src/components/events/ResolveEventModal.tsx` — модальное окно выбора исхода. (Выполнено)
- [x] **2.5. Контроль Финансов и Логов (Crypto & Logs)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/Crypto`
  - **Куда**: `aipa-admin/src/pages/CryptoLogs.tsx` (Выполнено)
- [ ] **2.6. Статистика (Statistic)**
  - **Откуда**: `mycoin-admin-webapp-v2/src/pages/Statistic`
  - **Куда**: `aipa-admin/src/pages/Statistic.tsx`

---

## 🤖 ПОДПРОЕКТ 3: Telegram Mini App (ai-predict-arena/aipa-tapbot-front)
**Цель**: Перенести Vite/React/TS-кликер, разделить его на модули и интегрировать Telegram WebApp SDK.

### 📋 Пошаговый план переноса:

#### 1. Подготовка и перенос основы
- [x] **1.1. Копирование структуры проекта**
  - **Что сделать**: Скопировать все файлы из папки `mycoin-tapbot-front` в новую директорию `ai-predict-arena/aipa-tapbot-front` (кроме папки `.git` и `node_modules`). (Выполнено)
  - **Что сделать**: В `package.json` изменить `"name"` на `"aipa-tapbot-front"`. (Выполнено)
- [x] **1.2. Telegram SDK**
  - **Что сделать**: Убедиться, что в `index.html` подключен скрипт Telegram WebApp SDK: `<script src="https://telegram.org/js/telegram-web-app.js"></script>`. (Выполнено)

#### 2. Рефакторинг экранов (лимит 500 строк)
- [ ] **2.1. Экран кликера (Clicker Screen)**
  - **Откуда**: `mycoin-tapbot-front/src/pages/Clicker` или аналогичный главный компонент тапалки.
  - **Куда**: `aipa-tapbot-front/src/components/clicker/`
  - **Как резать**:
    - Выделить анимацию взлетающих цифр при клике в `ClickNumberEffect.tsx`.
    - Выделить индикатор энергии и прогресс-бар в `EnergyProgress.tsx`.
    - Логику тапов и отправки пакетов на бэкенд вынести в хук `useClicker.ts`.
- [ ] **2.2. Раздел Задач (Tasks Screen)**
  - **Откуда**: `mycoin-tapbot-front/src/pages/Tasks`
  - **Куда**: `aipa-tapbot-front/src/pages/Tasks.tsx`
  - **Как резать**: Выделить каждую карточку социальной задачи в `TaskItem.tsx`, логику таймеров проверок вынести в `useTasks.ts`.
- [ ] **2.3. Раздел Друзей (Friends Screen)**
  - **Откуда**: `mycoin-tapbot-front/src/pages/Friends`
  - **Куда**: `aipa-tapbot-front/src/pages/Friends.tsx`
  - **Как резать**: Логику генерации реферальной ссылки и шаринга через Telegram Bot API вынести в `useFriends.ts`.

---

## 🧪 ПОДПРОЕКТ 4: Валидация сборки и редизайн под Neumorphism
**Цель**: Убедиться, что все 3 подпроекта компилируются, запускаются и оформлены в светлом нейморфическом стиле.

### 📋 Пошаговый план:

- [x] **4.1. Проверка сборки**
  - [x] Запустить `npm run build` в `aipa-webapp`. (Выполнено)
  - [x] Запустить `npm run build` в `aipa-admin`. (Выполнено)
  - [x] Запустить `npm run build` в `aipa-tapbot-front`. (Выполнено)
- [ ] **4.2. Стилизация под Neumorphism**
  - [ ] Наложить CSS переменные и тени `ui-kit.html` на элементы интерфейса админки и кликера.
  - [ ] Заменить все стандартные Bootstrap-карточки на `.nm-card` и `.nm-card-inset`.
- [ ] **4.3. Адаптивное тестирование**
  - [ ] Протестировать работу интерфейсов на эмуляторе мобильных экранов (Chrome DevTools).

---

## 🚀 ИНФРАСТРУКТУРА: Деплой и CI/CD
**Цель**: Автоматический деплой при каждом `git push` на Cloudflare Pages.

### Сервисы:
| Сервис | Роль | URL |
|---|---|---|
| **Cloudflare Pages** | Хостинг 3-х фронтендов | pages.dev |
| **Render.com** | Backend (Java Spring Boot) | render.com |
| **Supabase** | База данных PostgreSQL | supabase.com |
| **Cron-job.org** | Планировщик задач | cron-job.org |

### Живые URL:
- 🌐 **WebApp**: https://ai-predict-arena.pages.dev
- 🛡️ **Admin**: https://aipa-admin.pages.dev  
- 🤖 **Tapbot**: https://aipa-tapbot.pages.dev

### Чеклист деплоя:
- [x] **D.1. Первый деплой всех 3-х проектов** (Выполнено)
  - [x] aipa-webapp → https://ai-predict-arena.pages.dev
  - [x] aipa-admin → https://aipa-admin.pages.dev
  - [x] aipa-tapbot-front → https://aipa-tapbot.pages.dev
- [x] **D.2. Скрипт ручного деплоя** `deploy.ps1` в корне монорепо. (Выполнено)
- [x] **D.3. GitHub Actions CI/CD** `.github/workflows/deploy.yml` — авто-деплой при push в main. (Создан)
- [ ] **D.4. Добавить GitHub Secrets** для автоматического CI/CD:
  - [ ] `CLOUDFLARE_API_TOKEN` — создать на https://dash.cloudflare.com/profile/api-tokens (шаблон: Edit Cloudflare Workers)
  - [ ] `CLOUDFLARE_ACCOUNT_ID` = `96177d40d5e6efd0743f8c5fd02e57e3`
- [ ] **D.5. Подключить кастомный домен** (опционально) в Cloudflare Pages → Custom domains.
