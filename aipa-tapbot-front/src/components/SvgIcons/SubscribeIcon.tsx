import React from 'react';
import { taskStatusType } from '../ItemWrapper/types';
import { renderIconColor } from './helpers';

interface TaskIconProps {
  status: taskStatusType;
}

const SubscribeIcon: React.FC<TaskIconProps> = ({ status }) => {
  return (
    <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.37839 7.64392H8.15384V19.0501H2.37839C2.01282 19.0501 1.66222 18.9049 1.40372 18.6464C1.14522 18.3879 1 18.0373 1 17.6717V9.02231C1 8.65674 1.14522 8.30614 1.40372 8.04764C1.66222 7.78914 2.01282 7.64392 2.37839 7.64392Z"
        stroke={renderIconColor(status)}
        stroke-width="2"
      />
      <path
        d="M8.15387 19.0501V7.64392C8.15387 7.64392 11.1657 7.71283 16.1761 7.64392C21.1865 7.575 27.0516 4.4047 30.8628 1.16548C30.9625 1.08021 31.0845 1.02516 31.2143 1.00679C31.3442 0.988423 31.4766 1.0075 31.596 1.06178C31.7155 1.11605 31.8169 1.20328 31.8885 1.31321C31.96 1.42315 31.9987 1.55121 32 1.68238V25.0392C31.9997 25.1678 31.9634 25.2937 31.8953 25.4028C31.8272 25.5118 31.7299 25.5996 31.6144 25.6563C31.499 25.7129 31.37 25.7361 31.2421 25.7233C31.1141 25.7105 30.9923 25.6621 30.8904 25.5837C28.4369 23.6539 22.3306 19.3396 16.4173 19.1604C12.9576 19.0501 10.1594 19.0501 8.15387 19.0501Z"
        stroke={renderIconColor(status)}
        stroke-width="2"
      />
      <path
        d="M10.4971 29.9325H7.18898C6.82341 29.9325 6.47281 29.7873 6.21432 29.5288C5.95582 29.2703 5.81059 28.9197 5.81059 28.5541L5.1214 19.057H11.1863L11.8755 28.5541C11.8755 28.9197 11.7303 29.2703 11.4718 29.5288C11.2133 29.7873 10.8627 29.9325 10.4971 29.9325Z"
        stroke={renderIconColor(status)}
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_198_3822"
          x1="1"
          y1="7.64392"
          x2="8.23396"
          y2="7.69496"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1732C3" />
          <stop offset="1" stop-color="#A51CBB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_198_3822"
          x1="8.15387"
          y1="1"
          x2="32.2654"
          y2="1.26157"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1732C3" />
          <stop offset="1" stop-color="#A51CBB" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_198_3822"
          x1="5.1214"
          y1="19.057"
          x2="11.9512"
          y2="19.1047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1732C3" />
          <stop offset="1" stop-color="#A51CBB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SubscribeIcon;
