export interface Offer extends OfferBase {
  description: string;
  promocode?: string;
  dateEnd: string;
  vendorDescription: string;
  numberOfUses: number;
  numberOfViews: number;
  // dateStart: string; will need it later
  // isActive: boolean; will need it late
  // createAt: string; will need it later
  // updateAt: string; will need it later
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

interface Office {
  x: number;
  y: number;
  address: string;
  phoneNumber: string;
}
