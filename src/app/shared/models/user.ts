export interface UserLogin extends User {
  token: string;
  user: User;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  cityId: string | undefined;
  role: string;
  phone: string;
  photoUrl?: string;
  isActive?: boolean;
}
