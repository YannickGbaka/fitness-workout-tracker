import {Router} from 'express';
import { getWorkouts, storeWorkout } from '../controllers/workout.controller.ts';
import { checkSchema } from 'express-validator';
import workoutValidationSchema from '../utils/validations/workout.validation.ts';

const workoutRouter = Router();

workoutRouter.route('/', checkSchema(workoutValidationSchema))
    .post(storeWorkout)
    .get(getWorkouts);

export default workoutRouter;