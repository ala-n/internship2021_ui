export interface Tag {
  id: string;
  name: string;
  usesByUsers: number;
  usesByVendor: number;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
