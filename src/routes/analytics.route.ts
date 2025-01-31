import { Router } from 'express';
import { getExerciseTrends, getWorkoutAnalytics } from '../controllers/analytics.controller.ts';
import { checkSchema } from 'express-validator';

const analyticsRouter = Router();

const dateValidationSchema = {
    startDate: {
        in: ['query'],
        isISO8601: true,
        errorMessage: 'Start date must be a valid ISO 8601 date'
    },
    endDate: {
        in: ['query'],
        isISO8601: true,
        errorMessage: 'End date must be a valid ISO 8601 date'
    }
};

analyticsRouter.get('/exercise-trends', getExerciseTrends);
analyticsRouter.get('/workout-analytics', getWorkoutAnalytics);

export default analyticsRouter; 