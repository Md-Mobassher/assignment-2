import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// user route
router.post('/', userController.createUser);

router.get('/', userController.getAllUser);

router.get('/:userId', userController.getSingleUser);

router.put('/:userId', userController.updateAUser);

router.delete('/:userId', userController.deleteAUser);

// order route
router.put('/:userId/orders', userController.updateAnOrder);

router.get('/:userId/orders', userController.getAllOrder);

router.get('/:userId/orders/total-price', userController.calculateTotalPrice);

export const userRouter = router;
