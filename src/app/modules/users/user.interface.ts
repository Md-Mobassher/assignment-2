import { Model } from 'mongoose';

export interface UserFullName {
  firstName: string;
  lastName: string;
}

export interface UserAddress {
  street: string;
  city: string;
  country: string;
}

export interface Product {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  userName: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: UserAddress;
  isDeleted: boolean;
  orders?: Product[];
}

// static method
export interface UserModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>;
}
