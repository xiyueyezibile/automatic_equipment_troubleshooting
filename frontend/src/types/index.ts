export type Status = 'error' | 'success' | 'warning';
export interface Factory {
  id?: string;
  name: string;

  info?: string;
  children: { id?: string; data?: FactoryChildren; name: string; status: Status; info?: string }[];
}
export interface FactoryChildren {
  status: string;
  assemblyLinePosition: number;
  contractNumber: string;
  equipmentNumber: string;
  equipmentState: number;
  field2: string;
  id: string;
  manufacturerContact: string;
  manufacturerName: string;
  purchaseDate: string;
  workshopNumber: number;
  info?: string;
  name?: string;
  data?: any;
}
