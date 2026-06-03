# UI/UX Design System — AI Predict Arena (AIPA)

Этот документ описывает дизайн-систему проекта **AI Predict Arena (AIPA)**, собранную на основе аудита исходного кода `mycoin-webapp-v2` и `mycoin-admin-webapp-v2`, и адаптированную под новый бренд.

---

## ⚠ КРИТИЧЕСКИЕ ПРАВИЛА (читать в первую очередь)

> Эти правила обязательны для всех разработчиков и дизайнеров. Нарушение недопустимо.

### ЗАПРЕЩЕНО
- **НИКОГДА не использовать emoji** (😀🎯🔔🏆 и любые другие) в интерфейсе, кнопках, иконках, уведомлениях и коде компонентов. Emoji — это не иконки. Они непредсказуемо выглядят в разных ОС/браузерах и разрушают визуальную систему.
- Не использовать иконки без явного смысла (например, иконку корзины 🛒 на платформе прогнозов).
- Не использовать placeholder-картинки и lorem ipsum в production-коде.

### ИКОНКИ — Phosphor Icons (Web Components)
- **Библиотека:** [Phosphor Icons Web Components](https://github.com/phosphor-icons/webcomponents) — MIT License, CDN-ready
- **Подключение:** `<script type="module" src="https://unpkg.com/@phosphor-icons/webcomponents@2.1"></script>`
- **Стиль весов для AIPA:** `light` или `regular` — идеально гармонируют с мягкими neumorphic-тенями
- **Использование:** `<ph-chart-line weight="light"></ph-chart-line>` (weight передаётся через атрибут)
- **Преимущество:** Рендерит чистый SVG прямо в DOM. Нет CORS-ограничений (всегда работает при локальном просмотре через `file://`), не зависит от файлов шрифтов, масштабируется без искажений.
- **Запрещённые веса:** `weight="fill"` — слишком тяжёлый для светлой neumorphic-поверхности
- Иконка должна нести смысл. Если смысл непонятен без подписи — выбери другую иконку.

### СТИЛЬ
- Светлый neumorphism (Themesberg Neumorphism UI Pro): фон `#e6e7ee`, тени `#b8b9be` / `#ffffff`
- **Основной шрифт (UI):** `Space Grotesk` — 300/400/500/600/700
  - Строгий, геометрический, с тонким намёком на sci-fi через уникальные глифы
  - `letter-spacing: -0.01em` на body, до `-0.03em` на крупных заголовках
  - Никакого `font-weight: 300` для body — это не нейморфизм, а слабость. Используем `400` (нейтральный, книжный)
- **Шрифт данных (цифры, ID, ставки, коэффициенты):** `Space Mono` — 400/700
  - Для всех числовых значений: ставки, коэффициенты, балансы, ID событий
  - `font-variant-numeric: tabular-nums` — цифры одинаковой ширины, идеально для таблиц
  - Моноширинный брат Space Grotesk — визуальная согласованность
- **Подключение:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  ```
- **CSS-переменные:**
  ```css
  --font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:   'Space Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  ```
- Акцент: **#2D4CC8** (синий)

---

## 1. Цветовая палитра (Color Palette)

### 1.1 Новая палитра AIPA (целевая)

Новая палитра основана на глубоких космических оттенках фиолетового с яркими неоновыми акцентами.

| Роль цвета | CSS-переменная | HEX / RGBA | Описание |
| :--- | :--- | :--- | :--- |
| **Background (Основной)** | `--bg-primary` | `#080415` | Фоновый цвет страниц (глубокий фиолетовый) |
| **Background (Вторичный)** | `--bg-secondary` | `#0f0a26` | Фон для карточек и блоков нижнего слоя |
| **Glass Card Bg** | `--glass-bg` | `rgba(23, 15, 52, 0.4)` | Полупрозрачный фон для элементов глассморфизма |
| **Primary (Основной бренд)** | `--color-primary` | `#9333ea` | Фиолетовый неон — кнопки, активные элементы |
| **Accent (Акцент)** | `--color-accent` | `#06b6d4` | Циановый неон — подсветка, графики, фокус |
| **Warning (Предупреждение)** | `--color-warning` | `#f59e0b` | Янтарный — ожидающие события |
| **Danger (Ошибка / Проигрыш)** | `--color-danger` | `#ef4444` | Красный — проигранные прогнозы |
| **Text Primary** | `--text-primary` | `#f3f4f6` | Белый/светло-серый для заголовков |
| **Text Secondary** | `--text-secondary` | `#9ca3af` | Серый — описания, второстепенный текст |

### 1.2 Исходная палитра MyCoin (справочная, из `variebles.scss`)

Эти значения извлечены из `$`-переменных оригинального проекта. Используются при переносе компонентов.

| Переменная SCSS | HEX | Назначение |
| :--- | :--- | :--- |
| `$main_bg_color` | `#212745` | Основной фон UI, фон кнопок и карточек |
| `$space_cadet` | `#233753` | Фон dropdown и glassmorphism-блоков |
| `$blue_text` | `#3ddde8` | Акцентный (основной) цвет текста и иконок |
| `$white` | `#ffffff` | Белый текст |
| `$green` | `#4db275` | Успех / выигрыш |
| `$green_01` | `#60e394` | Вторичный зелёный |
| `$yellow` | `#ffd01f` | Жёлтый — выделение |
| `$yellow_01` | `#fed500` | Золотой |
| `$red` | `#fa2b2b` | Ошибка / проигрыш |
| `$blue` | `#2d9cdb` | Синий вторичный |
| `$blue_01` | `#499dbe` | Рамки и подчёркивания |
| `$blue_02` | `#229dbb` | Активный выбор |
| `$blue_04` | `#015bbb` | Заголовки секций |
| `$grey_01` | `#667998` | Серый для дней недели, caption |
| `$grey_02` | `#5d6e8d` | Неактивные вкладки |
| `$violet` | `#6474bf` | Вторичный фиолетовый (admin) |

### 1.3 Градиенты (из `variebles.scss`)

```scss
// Фиолетово-голубой (кнопки, заголовки)
$purple_gradient: linear-gradient(97.17deg, #6bb5f8 0%, rgba(184, 107, 248, 0.87) 101.96%);

// Голубой полупрозрачный (стекло)
$blue_gradient: linear-gradient(101.35deg, rgba(57, 198, 212, 0.12) 0.3%, rgba(57, 198, 212, 0) 109.42%);

// Зелёный (успех)
$green_gradient: linear-gradient(93.33deg, #85f067 0%, #3e7030 100%);

// Красный (проигрыш)
$red_gradient: linear-gradient(93.33deg, #f05151 0%, #702626 100%);

// Отключённый (disabled)
$disabled_gradient: linear-gradient(91.98deg, #4d505a -25.63%, #868f96 106.52%);
```

### 1.4 Уведомления (notifications)

| Тип | Цвет метки | HEX |
| :--- | :--- | :--- |
| Error | `$red_2` | `#ff0000` |
| Success | `$green_03` | `#53d888` |
| Warning | `$binary-yellow` | `#FFD025` |

---

## 2. Типографика и шрифты

### 2.1 Основной шрифт

- **Оба проекта**: `Inter` (самоподключение через `.woff` файлы в `/public/fonts/`)
- **Фолбэк**: `BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif`
- **Целевой AIPA**: `Manrope` → `Inter` (sans-serif)
- **Дополнительный (в некоторых местах)**: `Lato` (вкладки в withdrawal module)

### 2.2 Начертания (из `fonts.scss`)

| Начертание | Font-weight | Файл |
| :--- | :--- | :--- |
| Regular | 400 | `Inter-Regular.woff` |
| Medium | 500 | `Inter-Medium.woff` |
| SemiBold | 600 | `Inter-SemiBold.woff` |
| Bold | 700 | `Inter-Bold.woff` |
| ExtraBold | 800 | `Inter-ExtraBold.woff` |

### 2.3 Шкала размеров (из кодовой базы)

| Класс / Элемент | font-size | font-weight | line-height | Назначение |
| :--- | :--- | :--- | :--- | :--- |
| `.title-40` / H1 | `40px` | 700 | — | Заголовки секций на главной |
| `.text-normal` | `20px` | 400 | `24px` | Основной body текст |
| `.text-small` | `12px` | 400 | — | Мелкий caption текст |
| `notification .title` | `20px` / `32px` | 700 | `24px` | Заголовок уведомления |
| `notification .message` | `15px` / `32px` | 400 | `18.5px` | Текст уведомления |
| `input label` | `15px` | 700 | `18px` | Подпись поля ввода |
| `.tab` | `16px` | 700 | — | Текст вкладок |
| `.RRT__tab--selected` | — | — | — | Активная вкладка: цвет `#3ddde8` |
| `button .text.sm` | `12px` | 400 | `15px` | Малый текст кнопки |
| `button .text.md` | `15px` | 400 | `18px` | Средний текст кнопки |
| `button .text.xl` | `20px` | 400 | `24px` | Большой текст кнопки |
| `button .text.bolder` | `30px` | 700 | 150% | Жирный текст кнопки |
| `forgotPassword .text` | `30px` | 400 | normal | Текст подсказки формы |
| `warning modal .text` | `25px` | 700 | normal | Текст предупреждения |

### 2.4 Новая шкала AIPA (целевая)

| Элемент | Размер | Насыщенность |
| :--- | :--- | :--- |
| H1 | 3.5rem–4.5rem (56–72px) | Bold / ExtraBold |
| H2 | 2.25rem–2.5rem (36–40px) | Semibold / Bold |
| H3 | 1.5rem–1.75rem (24–28px) | Semibold |
| Body | 1rem–1.125rem (16–18px) | Regular |

---

## 3. Стили Глассморфизма (Glassmorphism Rules)

### 3.1 Классический глассморфизм (из dropdown, withdrawal, info-блоков)

Повсеместный паттерн в `mycoin-webapp-v2` — backdrop-filter в сочетании с полупрозрачным фоном:

```scss
// Оригинальный паттерн (из нескольких модулей):
@supports (backdrop-filter: blur(20px)) {
  backdrop-filter: blur(20px);
  background: linear-gradient(
    101.35deg,
    rgba(57, 198, 212, 0.12) 0.3%,
    rgba(57, 198, 212, 0) 109.42%
  );
}
// Фолбэк без поддержки backdrop-filter:
background: #233753;
background-blend-mode: overlay, normal;
```

Применяется в: `DropDownComponent`, `info__block`, `rdrCalendarWrapper`, `popover-body`.

### 3.2 Новая карточка AIPA (Glass Card)

```css
.aipa-glass-card {
    background: var(--glass-bg); /* rgba(23, 15, 52, 0.4) */
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border-radius: 16px;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.aipa-glass-card:hover {
    transform: translateY(-4px);
    border-color: rgba(6, 182, 212, 0.3);
    box-shadow: 0 10px 40px rgba(147, 51, 234, 0.15);
}
```

### 3.3 Неоморфизм (Neumorphism) — оригинальные паттерны

Neumorphic-стиль используется на кнопках, карточках событий, пагинации. Базовый цвет `#212745`.

```scss
// Выпуклая кнопка (normal state):
box-shadow:
  1px 1px 3px 0px #0D101CE5,
  -1px -1px 2px 0px #353E6EE5,
  1px -1px 2px 0px #0D101C33,
  -1px 1px 2px 0px #0D101C33,
  -1px -1px 2px 0px #0D101C80 inset,
  1px 1px 2px 0px #353E6E4D inset;

// Вдавленная кнопка (active state):
box-shadow:
  -5px -8px 9px 5px #293054,
  8px 9px 9px 6px #191e35,
  inset -4px -4px 5px #313b68,
  inset 4px 4px 8px #05070d;

// Карточка событий:
box-shadow:
  1px 1px 3px 0px rgba(13, 16, 28, 0.9),
  -1px -1px 2px 0px rgba(53, 62, 110, 0.9),
  1px -1px 2px 0px rgba(13, 16, 28, 0.2),
  -1px 1px 2px 0px rgba(13, 16, 28, 0.2),
  -1px -1px 2px 0px rgba(13, 16, 28, 0.5) inset,
  1px 1px 2px 0px rgba(53, 62, 110, 0.3) inset;

// Модальное окно:
box-shadow:
  25px 26px 11px -6px #191e35,
  -19px -7px 33px #293054,
  inset 8px 8px 10px -11px rgba(14, 21, 45, 0.49),
  inset -13px -18px 12px -7px rgba(20, 26, 54, 0.45);
```

### 3.4 Неоновые свечения (Neon Glows) — AIPA

```css
.neon-glow-purple { box-shadow: 0 0 15px rgba(147, 51, 234, 0.4); }
.neon-glow-cyan   { box-shadow: 0 0 15px rgba(6, 182, 212, 0.4); }
```

---

## 4. Граничные радиусы (Border Radius)

| Элемент | Border-radius |
| :--- | :--- |
| Основные карточки `.wrapperCard` | `15px` |
| Кнопки `.normal_btn` | `10px` |
| Инпуты `.input input` | `52px` (pill) |
| Dropdown меню | `10px` |
| Пагинация (обычная) | `8px` |
| Пагинация (активная) | `10px` |
| Модальные окна `.modal-content` | `15px` |
| Иконка предупреждения | `50%` (круг) |
| Поле balance-input | `10px` |
| AIPA Glass Card | `16px` |
| Скроллбар | `10px` |

---

## 5. UI-компоненты и состояния

### 5.1 Кнопки (Buttons)

#### `.normal_btn` — Базовая neumorphic-кнопка
- **Фон**: `#212745`
- **Тень**: neumorphic (выпуклая / вдавленная при `.active`)
- **Текст**: `$blue_text` (#3ddde8), 15px, Regular
- **Border**: none
- **Радиус**: 10px
- **Padding**: `12px 24px`
- **Disabled**: фон `#444754`, neumorphic-тень

#### `.color_btn.green` — Кнопка успеха
- **Фон**: `#4db275` (зелёный)
- **Hover**: box-shadow подсветка зелёным
- **Текст**: белый

#### `.color_btn.red` — Кнопка проигрыша / ставки
- **Фон**: `#eb4755`
- **Border**: `1px solid #781d25`
- **Текст**: белый

#### `.color_btn.winBtn` — Неактивная кнопка (win/нейтральная)
- **Фон**: `#444754`
- **Тень**: нейтральная neumorphic

#### AIPA Primary Button (целевой)
- **Фон**: градиент `from #9333ea to #06b6d4`
- **Текст**: белый, закруглённые углы (rounded-full)

#### AIPA Secondary / Glass Button
- Прозрачный фон + тонкая рамка 1px + лёгкое затемнение при hover

### 5.2 Поля ввода (Inputs)

#### `.input input` — Базовый Input
- **Фон**: `#212745`
- **Border**: `1px solid #3ddde8` (циановый)
- **Радиус**: `52px` (pill)
- **Цвет текста**: `#ffffff`
- **Placeholder**: белый, 25px Bold (основной), 20px (sm-вариант)
- **Focus**: outline `2px`, рамка сохраняется
- **Height**: `50px`
- **Font**: Inter

#### `.input.bordered` — Явная рамка
- `border: 1px solid #3ddde8 !important`

#### `.input.balance input` — Поле баланса
- **Border**: `1px solid #3ddde8`, радиус `10px`
- **Текст**: `#3ddde8`, 15px Bold
- **Height**: `48px`

#### `.custom-select` — Select из admin
- **Фон**: `rgba(34, 52, 79, 0.65)`
- **Border**: `1px solid $blue_text`
- **Радиус**: `10px`
- Dropdown открывается вниз: `border-radius: 10px 10px 0 0`
- Option hover: `#229dbb`

### 5.3 Карточки событий (Cards)

#### `.wrapperCard` — Карточка предсказания
- **Фон**: `#212745`
- **Тень**: neumorphic (сложная)
- **Радиус**: `15px`
- **Padding**: `24px 20px`
- **Размер**: 410px (адаптивный)
- **Анимация**: победная анимация конфетти (::before/::after, radial-gradient)
- **Hover ripple**: `hvr-ripple-out` animation на `.animated-btn`

#### `.info__block` — Glassmorphic инфо-блок
- **Border**: `1px solid #499dbe`
- **Радиус**: `10px`
- **backdrop-filter**: `blur(20px)` (с fallback `#233753`)
- **Фон (glass)**: градиент `rgba(57, 198, 212, 0.12) → rgba(57, 198, 212, 0)`

### 5.4 Выпадающие списки (Dropdowns)

#### `.menu` — DropDownComponent
- **Фон**: `#233753` / glassmorphic `$blue_gradient`
- **Border**: `1px solid #3ddde8`
- **Радиус**: `10px`
- **backdrop-filter**: `blur(20px)`
- **Ссылки**: `#3ddde8`, 12px Regular
- Hover: slide эффект (margin-left: 15px)
- Разделители: `border-bottom: 1px solid #499dbe`

### 5.5 Таблицы (Tables)

#### `.table table`
- **Фон**: прозрачный (наследует `#212745`)
- **th**: 11px, padding `5px 10px`, text-align center
- **td**: 11px, padding `5px 14px`, text-align center
- **tr**: border `1px solid #3ddde8` (строки)
- **Scrollbar**: цвет `#3ddde8` / track `#265b62`, ширина 4px
- **Пагинация**: фон `#212745`, цвет текста `#ffd01f` (жёлтый), neumorphic тень

### 5.6 Модальные окна (Modals)

#### `.customModal .modal-content`
- **Фон**: `#212745`
- **Тень**: neumorphic `25px 26px 11px -6px #191e35, -19px -7px 33px #293054, inset ...`
- **Радиус**: `15px`
- **Padding**: `24px 22px 30px`
- Размеры: `.sm` → max-width 320px; `.md` → 438px; `.lg` → min-width 556px

#### `.modal-warning`
- **Размер**: 506px (адаптивный → 360px mobile)
- **Иконка**: 120×120px круг с neumorphic-тенью
- **Текст**: 25px Bold

### 5.7 Уведомления (Notifications)

#### `.notification` (webapp)
- **Фон**: `linear-gradient(135deg, #232948 0%, #1f2542 100%)`
- **Тень**: neumorphic
- **Радиус**: `10px`
- **Размер шрифта title**: `32px` Bold
- Индикаторная полоса справа: `width: 10px`, цвет = тип уведомления
- Error: `#EB5757`, Success: `#53d888`, Warning: `#FFD025`

---

## 6. Прокрутка (Scrollbar)

```scss
// Цвет track: #265b62, thumb: #3ddde8, ширина: 4-5px, border-radius: 10px
// Мобильный (≤768px): scrollbar скрыт (transparent / display: none)
```

---

## 7. Переходы и анимации (Transitions & Animations)

| Компонент | Анимация |
| :--- | :--- |
| Кнопки `.normal_btn` | нет (transition убран) |
| Карточка `.wrapperCard` | `transition: all 0.2s ease` |
| AIPA Glass Card hover | `transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease` |
| Победная кнопка | `@keyframes hvr-ripple-out` (expand + fade out border) |
| Конфетти карточки | `@keyframes greentopBubbles / greenbottomBubbles` (0.6s) |
| Slider bullet | `transition: opacity 0.3s ease, transform 0.3s ease` |
| Balance input overlay | `transition: all 0.8s ease` |
| `.fullWrapper-details` (mobile drawer) | `transition: bottom 0.2s linear` |

---

## 8. Брейкпоинты (Breakpoints)

| Название | Ширина |
| :--- | :--- |
| notebook | ≤ 1279px |
| tablet | ≤ 1024px |
| tablet-small | ≤ 991px |
| mobile | ≤ 767px / 768px |
| mobile-small | ≤ 576px |
| Карточки mobile | 320px |

---

## 9. Bootstrap-переопределения (admin-webapp-v2)

Файл `custom.scss` переопределяет Bootstrap-переменные:

```scss
$body-bg: #212745;
$body-color: #ffffff;
$table-color: #ffffff;
$table-hover-color: #3ddde8;
$accordion-button-active-bg: transparent;
$accordion-button-active-color: #ffffff;
```

---

## 10. CSS-переменные AIPA (целевые, для `ui-kit.html`)

```css
:root {
  --bg-primary:      #080415;
  --bg-secondary:    #0f0a26;
  --glass-bg:        rgba(23, 15, 52, 0.4);
  --color-primary:   #9333ea;
  --color-accent:    #06b6d4;
  --color-warning:   #f59e0b;
  --color-danger:    #ef4444;
  --color-success:   #22c55e;
  --text-primary:    #f3f4f6;
  --text-secondary:  #9ca3af;

  /* Исходная палитра MyCoin (legacy) */
  --legacy-bg:       #212745;
  --legacy-accent:   #3ddde8;
  --legacy-glass:    #233753;
  --legacy-border:   #499dbe;
}
```

---

*Документ сгенерирован по итогам аудита:*
- `mycoin-webapp-v2/styles/globals.scss` (906 строк)
- `mycoin-webapp-v2/styles/variebles.scss`
- `mycoin-webapp-v2/styles/fonts.scss`
- `mycoin-webapp-v2/components/Button/style.module.scss`
- `mycoin-webapp-v2/components/Input/index.module.scss`
- `mycoin-webapp-v2/components/Card/style.module.scss`
- `mycoin-webapp-v2/components/Table/table.module.scss`
- `mycoin-webapp-v2/components/DropDownComponent/style.module.scss`
- `mycoin-webapp-v2/components/Modal/WarningModal/style.module.scss`
- `mycoin-webapp-v2/styles/auth.module.scss`
- `mycoin-webapp-v2/styles/withdrawal.module.scss`
- `mycoin-webapp-v2/styles/forgotPassword.module.scss`
- `mycoin-admin-webapp-v2/src/index.scss`
- `mycoin-admin-webapp-v2/src/mixins.scss`
- `mycoin-admin-webapp-v2/src/custom.scss`
