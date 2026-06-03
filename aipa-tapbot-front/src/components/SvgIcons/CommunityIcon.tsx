import React from 'react';
import { taskStatusType } from '../ItemWrapper/types';
import { renderIconColor } from './helpers';

interface TaskIconProps {
  status: taskStatusType;
}

const CommunityIcon: React.FC<TaskIconProps> = ({ status }) => {
  return (
    <svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="activeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1732C3" />
          <stop offset="100%" stopColor="#A51CBB" />
        </linearGradient>
      </defs>
      <path
        strokeWidth="2"
        stroke={renderIconColor(status)}
        d="M21.0205 23.3686H7.72229L3.48704 26.7919L3.53093 23.3686H1.99483C1.86358 23.3686 1.73361 23.3426 1.61244 23.2922C1.49127 23.2417 1.38127 23.1678 1.2888 23.0746C1.19633 22.9815 1.1232 22.8709 1.07364 22.7494C1.02408 22.6278 0.999062 22.4977 1.00003 22.3664V7.92712C1.00002 7.79586 1.02599 7.6659 1.07645 7.54473C1.1269 7.42355 1.20083 7.31356 1.29398 7.22109C1.38713 7.12862 1.49766 7.05549 1.61921 7.00593C1.74075 6.95637 1.87089 6.93135 2.00215 6.93232H21.0205C21.1536 6.9284 21.2861 6.95124 21.4102 6.99947C21.5343 7.04771 21.6474 7.12037 21.7429 7.21314C21.8384 7.30591 21.9143 7.4169 21.9662 7.53954C22.018 7.66219 22.0446 7.79398 22.0446 7.92712V22.3445C22.0446 22.6161 21.9367 22.8766 21.7446 23.0686C21.5526 23.2607 21.2921 23.3686 21.0205 23.3686Z"
      />
      <rect x="6" y="10" width="12" height="2" rx="1" fill={renderIconColor(status)} />
      <rect x="6" y="14" width="6" height="2" rx="1" fill={renderIconColor(status)} />
      <rect x="6" y="18" width="9" height="2" rx="1" fill={renderIconColor(status)} />

      <path
        stroke={renderIconColor(status)}
        strokeWidth="2"
        d="M23.9172 17.4363H25.2778L29.513 20.3037L29.4984 17.4363H31.0052C31.2691 17.4363 31.5221 17.3315 31.7087 17.1449C31.8952 16.9583 32 16.7053 32 16.4415V1.99483C32 1.86358 31.9741 1.73362 31.9236 1.61244C31.8732 1.49127 31.7992 1.38127 31.7061 1.2888C31.6129 1.19633 31.5024 1.1232 31.3809 1.07364C31.2593 1.02408 31.1292 0.999062 30.9979 1.00003H11.9795C11.7157 1.00003 11.4627 1.10484 11.2761 1.2914C11.0896 1.47796 10.9847 1.73099 10.9847 1.99483V5.0012"
      />
    </svg>
  );
};

export default CommunityIcon;
