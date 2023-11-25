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

export interface IOrder {
  products: Product[];
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
  orders?: IOrder | [];

  getAllOrders(): Promise<IOrder | null>;
  calculateTotalPrice(): Promise<IOrder | null>;
}

// static method
export interface UserModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>;
}
