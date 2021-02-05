interface Office {
  x: number;
  y: number;
  address: string;
  phoneNumber: string;
  city: string;
}

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

export interface Vendor {
  id: number;
  name: string;
  title: string;
  description: string;
  website: string;
  offices: Office[];
  // isActive: boolean; will need it later
}
