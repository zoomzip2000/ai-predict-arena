import React from 'react';
import { taskStatusType } from '../ItemWrapper/types';
import { renderIconColor } from './helpers';

interface TaskIconProps {
  status: taskStatusType;
}

const VideoIcon: React.FC<TaskIconProps> = ({ status }) => {
  return (
    <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30.6809 1H2.31915C1.5906 1 1 1.5906 1 2.31915V25.4043C1 26.1328 1.5906 26.7234 2.31915 26.7234H30.6809C31.4094 26.7234 32 26.1328 32 25.4043V2.31915C32 1.5906 31.4094 1 30.6809 1Z"
        stroke={renderIconColor(status)}
      />
      <path d="M1 6.52722H32" stroke={renderIconColor(status)} />
      <path
        d="M13.9012 12.8196V20.2596C13.9012 20.3208 13.9183 20.3808 13.9505 20.4329C13.9827 20.485 14.0288 20.5271 14.0835 20.5545C14.1383 20.5819 14.1997 20.5935 14.2606 20.588C14.3216 20.5825 14.3799 20.5601 14.4289 20.5234L20.5564 16.7638C20.6037 16.7317 20.6416 16.6875 20.6662 16.6359C20.6909 16.5843 20.7014 16.5271 20.6967 16.47C20.692 16.413 20.6723 16.3583 20.6395 16.3114C20.6067 16.2645 20.5621 16.2272 20.5102 16.2032L14.3827 12.5425C14.3334 12.5188 14.2791 12.5074 14.2244 12.5094C14.1697 12.5114 14.1163 12.5267 14.0689 12.554C14.0214 12.5813 13.9814 12.6197 13.9522 12.666C13.9229 12.7123 13.9055 12.765 13.9012 12.8196Z"
        stroke={renderIconColor(status)}
      />
      <path d="M2.31915 1L6.82405 6.52723" stroke={renderIconColor(status)} />
      <path d="M6.87677 1L11.3817 6.52723" stroke={renderIconColor(status)} />
      <path d="M11.4741 1L15.979 6.52723" stroke={renderIconColor(status)} />
      <path d="M16.3483 1L20.8532 6.52723" stroke={renderIconColor(status)} />
      <path d="M21.2159 1L25.7208 6.52723" stroke={renderIconColor(status)} />
      <path d="M26.176 1L30.6809 6.52723" stroke={renderIconColor(status)} />
    </svg>
  );
};

export default VideoIcon;
