export interface Office {
  id: string;
  location: [x: number, y: number];
  x: number;
  y: number;
  vendorId: string;
  vendorName: string;
  phone: string;
  address: {
    country: string;
    cityId: string | undefined;
    street: string;
    house: string;
    room?: string;
  };
  street?: string; // for /api/offers/city/{cityId}
  house?: string; // for /api/offers/city/{cityId}
  room?: string; // for /api/offers/city/{cityId}
  city?: string | undefined; // for /api/offers/city/{cityId}
  email: string;
  isActive: boolean;
}
