import { Office } from './office';

export interface Vendor {
  id: string;
  name: string;
  title: string;
  description: string;
  city: string;
  website: string;
  offices: Office[];
  rating: number;
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
  isActive: boolean;
}
