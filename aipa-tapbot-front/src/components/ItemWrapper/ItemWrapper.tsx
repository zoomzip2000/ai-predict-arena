import React, { ReactElement } from 'react';
import styles from './ItemWrapper.module.scss';
import classNames from 'classnames/bind';
import { taskStatusType } from './types';

interface ItemWrapperPropTypes {
  taskStatus: taskStatusType;
  children: ReactElement;
  handleClick?: () => void;
  link?: string;
}

const cx = classNames.bind(styles);

const ItemWrapper: React.FC<ItemWrapperPropTypes> = ({ children, handleClick, taskStatus, link }) => {
  const containerStyles = cx({
    completeTaskBorder: taskStatus === 'complete',
    lockedTaskBorder: taskStatus === 'locked',
    activeTaskBorder: taskStatus === 'active',
  });

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={cx('resetLink')}>
      <button onClick={handleClick} className={containerStyles} disabled={taskStatus !== 'active'}>
        {children}
      </button>
    </a>
  );
};

export default ItemWrapper;
