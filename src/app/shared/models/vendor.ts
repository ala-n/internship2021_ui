import { Office } from './office';

export interface Vendor {
  id: string;
  name: string;
  title: string;
  cityId: string | undefined;
  description: string;
  city: string;
  website: string;
  vendorEntities: Office[];
  rate: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
}
