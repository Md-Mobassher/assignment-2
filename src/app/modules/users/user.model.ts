import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IOrder,
  IUser,
  UserAddress,
  UserFullName,
  UserModel,
} from './user.interface';
import config from '../../config';

const userNameSchema = new Schema<UserFullName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const userAddressSchema = new Schema<UserAddress>(
  {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'Id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'Is-Active is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required'],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is required'],
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  orders: {
    type: [orderSchema],
    required: false,
    default: [],
  },
});

// pre save middleware
userSchema.pre('save', async function (next) {
  const user = this; /* eslint-disable-line @typescript-eslint/no-this-alias */

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//  creating a custom static method to check user exist or not
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// Instance method to get all orders for a user
userSchema.statics.getAllOrders = async function (userId: number) {
  const user = await User.findOne({ userId });
  return user?.orders;
};

// // calculate total price
// userSchema.statics.calculateTotalPrice = async function (userId) {
//   const user = await User.findOne({ userId });
//   const orders = user?.orders || [];

//   const totalPrice = orders.reduce((acc: number, order: IOrder) => {
//     const orderTotal = order.price.reduce(
//       (orderTotal: number, item: any) =>
//         orderTotal + item.price * item.quantity,
//       0,
//     );
//     return acc + orderTotal;
//   }, 0);

//   return totalPrice;
// };

export const User = model<IUser, UserModel>('User', userSchema);
