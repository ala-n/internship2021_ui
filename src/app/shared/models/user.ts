import ObjectID from 'bson-objectid';

export interface User {
  _id: ObjectID;
  firstName: string;
  lastName: string;
  photoUrl: null,
  isActive: false,
  city: null,
  role: 0,
  token: string;
}
