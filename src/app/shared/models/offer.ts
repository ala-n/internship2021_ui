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
  cityId: string | undefined;
  vendorEntitiesId: string[];
  vendorEntities: Office[];
}

export interface Offer extends OfferBase {
  description: string;
  promoCode?: string;
  dateStart: string;
  dateEnd: string;
  numberOfUses: number;
  numberOfViews: number;
  rating: number;
  tags: string[];
  isActive: boolean;
  updatedAt: string;
}
