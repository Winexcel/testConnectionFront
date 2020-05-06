export interface User {
  login: string;
  password: string;
}

export interface Test {
  maxValue: number;
  currentValue: number;
  result: number;
  isCompleted: boolean;
}

export interface PostParam {
  name: string;
  value: string;
}
