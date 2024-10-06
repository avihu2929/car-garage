

export interface RepairModel {
  _id?: string;
  carCompany: string;
  carModel: string;
  carNumber: number;
  carCode: number;
  firstName: string;
  lastName: string;
  clientPhone: number;
  resolved: boolean;
  issue: string;
}