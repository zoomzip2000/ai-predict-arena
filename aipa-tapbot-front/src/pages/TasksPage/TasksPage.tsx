import React from 'react';
import { TaskPageCallToActionCard, TaskPageListContainer, TaskPageTitle } from '../../components';
import { tasks } from '../../components/TaskPageListContainer/tasks';

const TasksPage: React.FC = () => {
  const tasksSum = tasks.length + 1;

  return (
    <div>
      <TaskPageTitle tasksAmount={tasksSum} />
      <TaskPageListContainer />
      <TaskPageCallToActionCard />
    </div>
  );
};

export default TasksPage;
