import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserAddress, UserFullName, UserModel } from './user.interface';
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

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'Id is required'],
    unique: true,
  },
  userName: {
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
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware
userSchema.pre('save', async function (next) {
  const user = this;

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

//  creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
