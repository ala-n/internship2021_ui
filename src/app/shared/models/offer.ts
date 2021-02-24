import { Office } from './office';

export interface OfferBase {
  id: number;
  title: string;
  photoUrl: string;
  discount: string;
  vendorName: string;
  vendorId: number;
  numberOfUses: number;
  numberOfViews: number;
  city: string;
  offices: Office[];
}

export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateStart: string;
  dateEnd: string;
  numberOfUses: number;
  numberOfViews: number;
  photoGallery?: string[];
  tags: string[];
  isActive: boolean;
  updated: string;
}
