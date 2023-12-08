/* eslint-disable no-unused-vars */
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

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: UserAddress;
  isDeleted?: boolean | undefined;
  orders?: IOrder[] | [];
}

export interface UserModel extends Model<IUser> {
  getAllOrders(id: number): Promise<IOrder | null>;
}

export interface UserModel extends Model<IUser> {
  calculateTotalPrice(id: number): Promise<IOrder | null>;
}

// static method
export interface UserModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>;
}
