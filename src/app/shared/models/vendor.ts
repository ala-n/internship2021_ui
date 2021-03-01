import { Office } from './office';

export interface Vendor {
  id: string;
  name: string;
  title: string;
  description: string;
  website: string;
  offices: Office[];
  updated: string;
  isActive: boolean;
}
