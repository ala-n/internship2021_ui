export interface Office {
  id: 1;
  x: number;
  y: number;
  vendorId: number;
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
