import {Router} from 'express';
import { storeWorkout } from '../controllers/workout.controller.ts';
import { checkSchema } from 'express-validator';
import workoutValidationSchema from '../utils/validations/workout.validation.ts';

const workoutRouter = Router();

workoutRouter.route('/', checkSchema(workoutValidationSchema)).post(storeWorkout);

export default workoutRouter;