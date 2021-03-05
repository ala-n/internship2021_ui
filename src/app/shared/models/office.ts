export interface Office {
  id: string;
  location: [x: number, y: number];
  x: number;
  y: number;
  vendorId: string;
  vendorName: string;
  address: string; //must be joined to string from separate fields
  phone: string;
  country: string;
  city: string;
  street: string;
  house: string;
  room?: string;
  email: string;
  isActive: boolean;
}
