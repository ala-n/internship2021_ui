import { Office } from './office';

export interface OfferBase {
  id: string;
  title: string;
  photoUrl: string[];
  discount: string;
  vendorName: string;
  vendorId: string;
  numberOfUses: number;
  numberOfViews: number;
  city: string;
  officesId: string[];
  offices: Office[];
}

export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateStart: string;
  dateEnd: string;
  numberOfUses: number;
  numberOfViews: number;
  rating: number;
  tags: string[];
  isActive: boolean;
  updated: string;
}
