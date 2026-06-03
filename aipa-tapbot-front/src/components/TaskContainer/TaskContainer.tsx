import React, { ReactElement } from 'react';

interface TaskContainerProps {
  taskIcon?: string;
  taskStatusIcon?: string;
  taskName?: ReactElement;
  taskRewardNote?: ReactElement;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ taskIcon, taskStatusIcon, taskName, taskRewardNote }) => {
  return (
    <button type="button">
      {taskIcon && <img src={taskIcon} alt={taskIcon} />}
      <div>
        {taskName && <div>{taskName}</div>}
        {taskRewardNote && <div>taskRewardNote</div>}
      </div>
      {taskStatusIcon && <img src={taskStatusIcon} alt={taskStatusIcon} />}
    </button>
  );
};

export default TaskContainer;
