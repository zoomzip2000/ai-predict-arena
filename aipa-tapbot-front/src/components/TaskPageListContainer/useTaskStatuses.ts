import { useState, useEffect } from 'react';
import { taskStatusType } from '../ItemWrapper/types';
import { Task } from '../TaskItem/types';
import { startMining, tasks } from './tasks';

function defineStatus(tasks: Task[]): taskStatusType[] {
  let firstFalseFound = false;

  return tasks.map((task) => {
    if (task.isClaimed) {
      return 'complete';
    } else if (!firstFalseFound) {
      firstFalseFound = true;
      return 'active';
    } else {
      return 'locked';
    }
  });
}

function defineMiningStatus(tasks: Task[]): taskStatusType {
  const allTasksClaimed = tasks.every((task) => task.isClaimed);

  if (!allTasksClaimed && !startMining.isClaimed) {
    return 'locked';
  }

  if (allTasksClaimed && startMining.isClaimed) {
    return 'complete';
  }

  return 'active';
}

export function useTaskStatuses() {
  const [taskStatus, setTaskStatus] = useState<taskStatusType[]>([]);
  const [miningButtonStatus, setMiningButtonStatus] = useState<taskStatusType>('locked');

  useEffect(() => {
    setTaskStatus(defineStatus(tasks));
    setMiningButtonStatus(defineMiningStatus(tasks));
  }, []);

  const handleTaskClick = (index: number) => {
    setTimeout(() => {
      tasks[index].isClaimed = true;
      setTaskStatus(defineStatus(tasks));
      setMiningButtonStatus(defineMiningStatus(tasks));
    }, 3000);
  };

  const handleMiningClick = () => {
    setTimeout(() => {
      startMining.isClaimed = true;
      setMiningButtonStatus(defineMiningStatus(tasks));
    }, 3000);
  };

  return { taskStatus, miningButtonStatus, handleTaskClick, handleMiningClick };
}
