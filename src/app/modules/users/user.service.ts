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
        userName: '$userName',
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

const updateAUserFromDB = async (userData: IUser) => {
  const result = await User.updateOne(
    { userData },
    {
      $project: {
        userId: '$userId',
        userName: '$userName',
        fullName: '$fullName',
        age: '$age',
        email: '$email',
        isActive: '$isActive',
        hobbies: '$hobbies',
        address: '$address',
        _id: 0,
      },
    },
  );
  return result;
};

const deleteAUserFromDB = async (id: number) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateAUserFromDB,
  deleteAUserFromDB,
};
