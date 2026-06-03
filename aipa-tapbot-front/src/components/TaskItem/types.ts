export type Task = {
  taskName: string;
  link?: string;
  coinsReward?: number;
  isClaimed: boolean;
};

export type FinalTask = Pick<Task, 'taskName' | 'isClaimed'>;
