import React from 'react';
import styles from './TaskItem.module.scss';
import classNames from 'classnames/bind';
import { FinalTask, Task } from './types';
import { taskStatusType } from '../ItemWrapper/types';
import { isTask, renderStatusIcon, renderTaskIcon } from './helpers';

const cx = classNames.bind(styles);

interface TaskItemPropTypes {
  task: Task | FinalTask;
  taskStatus: taskStatusType;
  taskTitle: string;
}

const TaskItem: React.FC<TaskItemPropTypes> = ({ task, taskStatus, taskTitle }) => {
  const iconStatusClass = cx('iconStatusPosition', {
    iconStatusComplete: taskStatus === 'complete',
    iconStatusActive: taskStatus === 'active',
    iconStatusLocked: taskStatus === 'locked',
  });

  return (
    <div className={cx('taskItemPosition')}>
      <div className={cx('iconPosition')}>{renderStatusIcon(taskTitle, taskStatus)}</div>
      {task && (
        <div className={cx('taskItemElPosition')}>
          <div className={cx('taskItemContent')}>
            {task.taskName && <h3>{task.taskName}</h3>}
            {isTask(task) && task.coinsReward && <span>{task.coinsReward} MyCoin</span>}
          </div>
        </div>
      )}
      <div className={iconStatusClass}>{renderTaskIcon(taskStatus)}</div>
    </div>
  );
};

export default TaskItem;
