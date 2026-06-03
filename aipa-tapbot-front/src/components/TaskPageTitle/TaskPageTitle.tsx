import React from 'react';
import styles from './TaskPageTitle.module.scss';
import classNames from 'classnames/bind';

interface TaskPageTitleProps {
  tasksAmount: number;
}

const cx = classNames.bind(styles);

const TaskPageTitle: React.FC<TaskPageTitleProps> = ({ tasksAmount = 0 }) => {
  return (
    <div className={cx('tasksPageTitle')}>
      <h2>
        <span>Доступно {tasksAmount} місій</span>
        <br /> Виконуйте місії щоб отримати MyCoin
      </h2>
    </div>
  );
};

export default TaskPageTitle;
