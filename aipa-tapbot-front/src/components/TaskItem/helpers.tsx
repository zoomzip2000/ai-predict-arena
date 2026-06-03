import { taskStatusType } from '../ItemWrapper/types';
import ArrowIcon from '../SvgIcons/ArrowIcon';
import LockIcon from '../SvgIcons/LockIcon';
import CompleteIcon from '../SvgIcons/CompleteIcon';
import CommunityIcon from '../SvgIcons/CommunityIcon';
import BotIcon from '../SvgIcons/BotIcon';
import SubscribeIcon from '../SvgIcons/SubscribeIcon';
import VideoIcon from '../SvgIcons/VideoIcon';
import PickerIcon from '../SvgIcons/PickerIcon';
import { FinalTask, Task } from './types';

export const renderTaskIcon = (taskStatus: taskStatusType) => {
  switch (taskStatus) {
    case 'complete':
      return <CompleteIcon />;

    case 'active':
      return <ArrowIcon />;

    default:
      return <LockIcon />;
  }
};

export const renderStatusIcon = (taskTitle: string, taskStatus: taskStatusType) => {
  switch (taskTitle) {
    case 'Підпишіться на Telegram-канал':
      return <SubscribeIcon status={taskStatus} />;

    case 'Приєднайся до Telegram-спільноти':
      return <VideoIcon status={taskStatus} />;

    case 'Подивись відео':
      return <CommunityIcon status={taskStatus} />;

    case 'Авторизуйся у Telegram_bot':
      return <BotIcon status={taskStatus} />;

    case 'Запустити автомайнінг':
      return <PickerIcon status={taskStatus} />;

    default:
      return <CommunityIcon status={taskStatus} />;
  }
};

export const isTask = (task: Task | FinalTask): task is Task => {
  return (task as Task).coinsReward !== undefined;
};
