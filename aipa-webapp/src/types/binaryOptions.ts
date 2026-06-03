export enum Direction {
  Up = "UP",
  Down = "DOWN",
  None = "--",
}

export enum BetDirection {
  Up = "BID_UP",
  Down = "BID_DOWN",
}

export enum BetResult {
  Win = "Win",
  Loss = "Loss",
  Pending = "Pending",
  None = "--",
}

export enum BetStatus {
  Active = "ACTIVE",
  Finished = "FINISHED",
}

export interface BetRecord {
  id: number | null;
  uuid: null;
  eventId: string;
  fixationQuote: number;
  fixationTime: string;
  expirationQuote: number;
  expirationTime: string;
  result: Direction;
  betAmount: number | null;
  betDirection: BetDirection | null;
  betResult: BetResult;
  winAmount: string | null;
  status: BetStatus;
}

export enum TimerType {
  Bets = "BETS",
  Expiration = "EXPIRATION",
}

export interface TimerData {
  type: TimerType;
  timeEnd: number;
}

export enum MarkerDirection {
  Down = "Down",
  Up = "Up",
}

export interface Marker {
  direction: MarkerDirection;
  price: number;
  time: number;
}

export interface BetPoolDTO {
  pool: number;
}

export interface Coefficients {
  up: number;
  down: number;
}

export interface NotificationDto {
  id?: string;
  title: string;
  message: string;
  type: "Success" | "Error" | "Warning";
}
