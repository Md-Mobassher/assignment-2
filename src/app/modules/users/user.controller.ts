/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './user.validation';

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const { ...userData } = req.body;
    const zodParseData = await userValidationSchema.parse(userData);

    const result = await userService.createUserIntoDb(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// get a single user by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const result = await userService.getSingleUserFromDb(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// update a user
const updateAUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const userData = req.body;
    const result = await userService.updateAUserFromDB(userId, userData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// delete a user
const deleteAUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const result = await userService.deleteAUserFromDB(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// update order
const updateAnOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const orderData = req.body;
    const result = await userService.updateOrderFromDB(userId, orderData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// get all order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const result = await userService.getAllOrderFromDb(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// calculate total price
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const result = await userService.calculateTotalPriceFromDb(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: { code: 404, description: 'User not found!' },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateAUser,
  deleteAUser,
  updateAnOrder,
  getAllOrder,
  calculateTotalPrice,
};
