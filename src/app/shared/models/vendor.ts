import { Office } from './office';

export interface Vendor {
  id: string;
  name: string;
  title: string;
  cityId: string | undefined;
  description: string;
  website: string;
  offices: Office[];
  updatedAt: string;
  isActive: boolean;
}
