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
  // eslint-disable-next-line @typescript-eslint/ban-types
  photoGallery?: object;
  // isActive: boolean; will need it later
  // updateBy: string; will need it later
}
