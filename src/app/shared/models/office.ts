export interface Office {
  x: number;
  y: number;
  address: string; //must be joined to string from separate fields
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  house: string;
  room?: string;
  email: string;
  isActive: boolean;
}
