import { taskStatusType } from '../ItemWrapper/types';

export const renderIconColor = (status: taskStatusType) => {
  switch (status) {
    case 'complete':
      return 'rgb(59, 218, 33)';

    case 'active':
      return 'url(#activeGradient)';

    default:
      return '#95969B';
  }
};
