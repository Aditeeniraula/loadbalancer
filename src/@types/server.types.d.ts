export enum ServerStatus {
  active = "active",
  inactive = "inactive",
}

export interface Server {
  id: number;
  name: string;
  status: ServerStatus;
}
