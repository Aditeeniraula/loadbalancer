export enum ServerStatus {
  active = "active",
  inactive = "inactive",
  disabled = "disabled",
}

export interface Server {
  id: number;
  name: string;
  status: ServerStatus;
}
