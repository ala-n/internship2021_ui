export interface Offer {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  discount: string;
  // dateStart: string;
  // dateEnd: string;
  // VendorID: number;
  vendorName: string; //will be deleted
  phoneNumber: string;
  // isActive: boolean;
  numberOfUses: number;
  numberOfViews: number;
  // createAt: string;
  // updateAt: string;
  // createBy: string;
  // updateBy: string;
  // promocode?: string;
  location: Location[];
}

interface Location {
  x: number;
  y: number;
  address: string;
}
