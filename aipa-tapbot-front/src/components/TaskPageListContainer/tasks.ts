import { Task } from '../TaskItem/types';

export let tasks: Task[] = [
  {
    taskName: 'Підпишіться на Telegram-канал',
    coinsReward: 10,
    link: 'https://t.me/+Na310yXSW2kxZWNi',
    isClaimed: false,
  },
  {
    taskName: 'Приєднайся до Telegram-спільноти',
    coinsReward: 10,
    link: 'https://t.me/+Na310yXSW2kxZWNi',
    isClaimed: false,
  },
  { taskName: 'Подивись відео', coinsReward: 10, link: 'https://t.me/+Na310yXSW2kxZWNi', isClaimed: false },
  { taskName: 'Авторизуйся у Telegram_bot', coinsReward: 10, link: 'https://t.me/+Na310yXSW2kxZWNi', isClaimed: false },
];

export let startMining = { taskName: 'Запустити автомайнінг', isClaimed: false };
