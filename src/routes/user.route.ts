import {Router} from 'express'
import * as userController from '../controllers/user.controller.ts';
const userRouter = Router();


userRouter
    .route('/')
    .get(userController.getUsers);


userRouter.route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);


export default userRouter;
