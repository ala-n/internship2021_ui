export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateEnd: string;
  numberOfUses: number;
  numberOfViews: number;
  // isActive: boolean; will need it late
  // createBy: string; will need it later
  // updateBy: string; will need it later
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

export interface Vendor {
  id: number;
  title: string;
  description: string;
  website: string;
  offices: Office[];
}

interface Office {
  x: number;
  y: number;
  address: string;
  phoneNumber: string;
}
