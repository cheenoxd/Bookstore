import express from 'express';
import { getUser, addUser, updateUser, deleteUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', getUser);
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };