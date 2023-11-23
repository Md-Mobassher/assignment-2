import { Model } from 'mongoose';

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface OrderModel extends Model<IOrder> {}
