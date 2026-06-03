import React from 'react';
import styles from './TaskPageListContainer.module.scss';
import classNames from 'classnames/bind';
import TaskItem from '../TaskItem/TaskItem';
import ItemWrapper from '../ItemWrapper/ItemWrapper';
import { Task } from '../TaskItem/types';
import { useTaskStatuses } from './useTaskStatuses';
import { startMining, tasks } from './tasks';

const cx = classNames.bind(styles);

const TaskListContainer: React.FC = () => {
  const { taskStatus, miningButtonStatus, handleTaskClick, handleMiningClick } = useTaskStatuses();

  return (
    <div className={cx('taskListContainer')}>
      {tasks.map((task: Task, index: number) => (
        <ItemWrapper
          key={task.taskName}
          taskStatus={taskStatus[index]}
          handleClick={() => handleTaskClick(index)}
          link={task.link}
        >
          <TaskItem task={task} taskStatus={taskStatus[index]} taskTitle={task.taskName} />
        </ItemWrapper>
      ))}
      <ItemWrapper taskStatus={miningButtonStatus} handleClick={handleMiningClick}>
        <TaskItem task={startMining} taskStatus={miningButtonStatus} taskTitle={startMining.taskName} />
      </ItemWrapper>
    </div>
  );
};

export default TaskListContainer;
