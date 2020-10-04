export interface User {
  id: number;
  mobile: string;
  province: string;
  name: string;
  family: string;
  age: number;
  gender: boolean;
  weight?: any;
  hasDiabet?: boolean;
  hasBloodPressure?: boolean;
  hasRespiratoryDisease?: boolean;
  hasHeartDisease?: boolean;
}