export interface History {
  id: string;
  users: object;
  endpoint: string;
  action: string;
  dataBefore: JSON;
  dataAfter: JSON;
  createdAt: Date;
}
