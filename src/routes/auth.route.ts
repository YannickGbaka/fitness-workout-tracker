import {Router} from 'express';
import {signUp, login} from '../controllers/auth.controller.ts';
import { body } from 'express-validator';

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post(
    "/login",
    [
      body("email").notEmpty().isEmail().withMessage("The email is not valid"),
      body("password").notEmpty().withMessage("The password is not defined"),
    ],
    login
  );

export default authRouter;