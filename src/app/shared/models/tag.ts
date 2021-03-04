export interface Tag {
  id: string;
  name: string;
  usesByUsers: number;
  usesByVendor: number;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
