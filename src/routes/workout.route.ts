import {Router} from 'express';
import { getWorkouts, storeWorkout, updateWorkout, getWorkout } from '../controllers/workout.controller.ts';
import { checkSchema } from 'express-validator';
import { workoutValidationSchema, workoutUpdateValidationSchema } from '../utils/validations/workout.validation.ts';

const workoutRouter = Router();

workoutRouter.route('/')
    .post(checkSchema(workoutValidationSchema), storeWorkout)
    .get(getWorkouts)

workoutRouter
    .route('/:id')
    .get(getWorkout)
    .put(checkSchema(workoutUpdateValidationSchema), updateWorkout)

export default workoutRouter;