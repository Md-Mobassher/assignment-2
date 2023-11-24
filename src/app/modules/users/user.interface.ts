import { Model } from 'mongoose';
import { IOrder } from '../orders/order.interface';

export interface UserFullName {
  firstName: string;
  lastName: string;
}

export interface UserAddress {
  street: string;
  city: string;
  country: string;
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
  orders?: IOrder[];
  isDeleted: boolean;
}

// static method
export interface UserModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>;
}
