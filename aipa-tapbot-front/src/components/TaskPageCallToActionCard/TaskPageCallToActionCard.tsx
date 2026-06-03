import React from 'react';
import styles from './TaskPageCallToActionCard.module.scss';
import classNames from 'classnames/bind';
import crystalIcon from '../../assets/icons/crystalBall.png';

const cx = classNames.bind(styles);

const TaskPageCallToActionCard: React.FC = () => {
  return (
    <div className={cx('descriptionContainer')}>
      <p>Приєднуйся до MyCoin та передбачай майбутнє – це не просто гра, це твоя можливість впливати на світ!</p>
      <img className={cx('crystalBallPosition')} src={crystalIcon} alt="crystal_ball" />
    </div>
  );
};

export default TaskPageCallToActionCard;
