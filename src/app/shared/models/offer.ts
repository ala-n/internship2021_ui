import { Office } from './office';

export interface OfferBase {
  id: number;
  title: string;
  photoUrl: string;
  discount: string;
  vendorName: string;
  numberOfUses: number;
  numberOfViews: number;
  offices: Office[];
}

export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateEnd: string;
  numberOfUses: number;
  numberOfViews: number;
  photoGallery?: string[];
  // isActive: boolean; will need it later
  // updateBy: string; will need it later
}
