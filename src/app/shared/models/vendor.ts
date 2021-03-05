import { Office } from './office';

export interface Vendor {
  id: string;
  name: string;
  title: string;
  city: string;
  description: string;
  website: string;
  offices: Office[];
  updatedAt: string;
  isActive: boolean;
}
