import { Router } from 'express';
import { getCompletedWorkouts, getExerciseTrends, getWorkoutAnalytics } from '../controllers/report.controller.ts';
import { checkSchema } from 'express-validator';

const reportRouter = Router();

const dateValidationSchema = {
    startDate: {
        in: ['query'],
        isISO8601: {
            options: true
        },
        errorMessage: 'Start date must be a valid ISO 8601 date'
    },
    endDate: {
        in: ['query'],
        isISO8601: {
            options: true
        },
        errorMessage: 'End date must be a valid ISO 8601 date'
    }
};

reportRouter.get('/completion', checkSchema(dateValidationSchema), getCompletedWorkouts);
reportRouter.get('/exercise-trends', checkSchema(dateValidationSchema), getExerciseTrends);
reportRouter.get('/workout-analytics', checkSchema(dateValidationSchema), getWorkoutAnalytics);

export default reportRouter;