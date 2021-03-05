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
    cityId: string;
    street: string;
    house: string;
    room?: string;
  };
  email: string;
  isActive: boolean;
}
