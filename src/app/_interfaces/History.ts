export interface History {
  id: string;
  users_id: string;
  endpoint: string;
  action: string;
  dataBefore: JSON;
  dataAfter: JSON;
  createdAt: Date;
}
