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
  const result = await User.find();
  return result;
};

export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
};
