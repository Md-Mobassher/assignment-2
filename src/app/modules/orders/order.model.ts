import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderShema = new Schema<IOrder>({
  productName: {
    type: String,
    required: [true, 'Product Name is Requied'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
  },
});

export const Order = model<IOrder, OrderModel>('Order', orderShema);
