import { Office } from './office';

export interface OfferBase {
  id: string;
  title: string;
  discount: string;
  photoUrl: string[];
  numberOfUses: number;
  numberOfViews: number;
  city: string;
  officesId: string[];
  offices: Office[];
  vendorName: string;
  vendorId: string;
}

export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateStart: string;
  dateEnd: string;
  tags: string[];
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
  isActive: boolean;
}
