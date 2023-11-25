import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exist');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDb = async () => {
  const users = await User.aggregate([
    {
      $project: {
        username: '$userName',
        fullName: '$fullName',
        age: '$age',
        email: '$email',
        address: '$address',
        _id: 0,
      },
    },
  ]);
  return users;
};

const getSingleUserFromDb = async (id: number) => {
  const user = await User.aggregate([
    { $match: { userId: id } },
    {
      $project: {
        userId: '$userId',
        username: '$username',
        fullName: '$fullName',
        age: '$age',
        email: '$email',
        isActive: '$isActive',
        hobbies: '$hobbies',
        address: '$address',
        _id: 0,
      },
    },
  ]);
  return user;
};

const updateAUserFromDB = async (userId: number, userData: IUser) => {
  const result = await User.findOneAndUpdate({ userId: userId }, userData, {
    new: true,
    projection: {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
      _id: 0,
    },
  });
  return result;
};

const deleteAUserFromDB = async (id: number) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

// order service funciton
const updateOrderFromDB = async (userId: number, orderData: IUser) => {
  const result = await User.findOneAndUpdate({ userId: userId }, orderData, {
    new: true,
    projection: {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
      _id: 0,
    },
  });
  return null;
};

// get all order from db
export const getAllOrderFromDb = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);

  if (!existingUser) {
    return null;
  }
  const orders = await existingUser.getAllOrders();
  return orders;
};

export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateAUserFromDB,
  deleteAUserFromDB,
  updateOrderFromDB,
  getAllOrderFromDb,
};
