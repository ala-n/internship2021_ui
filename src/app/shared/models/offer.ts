import { Office } from './office';

export interface OfferBase {
  id: string;
  title: string;
  discount: string;
  photoUrl: string[];
  numberOfUses: number;
  numberOfViews: number;
  cityId: string | undefined;
  vendorEntitiesId?: string[];
  vendorEntities: Office[];
  vendorName: string;
  vendorId: string;
}

export interface Offer extends OfferBase {
  description: string;
  promoCode?: string;
  dateStart: string;
  dateEnd: string;
  rate: number;
  tags: string[];
  images: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
}
