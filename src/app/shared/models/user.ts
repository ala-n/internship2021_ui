export interface UserLogin extends User {
  token: string;
  user: User;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  cityId: string;
  role: string;
  phone: string;
  photoUrl?: string;
  isActive?: boolean;
}
