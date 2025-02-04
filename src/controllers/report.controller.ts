import catchAsync from "../utils/catchAsync.util.ts";
import * as workoutService from '../services/workout.service.ts';
import * as analyticsService from '../services/exerciseAnalytics.service.ts';
import ApiError from "../utils/apiErrors.util.ts";
import { status as httpStatus } from 'http-status';

const getCompletedWorkouts = catchAsync(async (request, response) => {
    const { startDate, endDate } = request.query;
    const userId = request.user?._id;

    const data = await workoutService.completedWorkoutQuery(userId, startDate, endDate);
    response.send(data);
});

const getExerciseTrends = catchAsync(async (request, response) => {
    const { startDate, endDate } = request.query;
    const userId = request.user?._id;

    if (!startDate || !endDate) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Start date and end date are required');
    }

    const trends = await analyticsService.getExerciseTrends(
        userId,
        new Date(startDate as string),
        new Date(endDate as string)
    );

    response.status(httpStatus.OK).json({
        trends,
        period: {
            startDate,
            endDate
        }
    });
});

const getWorkoutAnalytics = catchAsync(async (request, response) => {
    const { startDate, endDate } = request.query;
    const userId = request.user?._id;

    if (!startDate || !endDate) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Start date and end date are required');
    }

    const analytics = await analyticsService.getWorkoutAnalytics(
        userId,
        new Date(startDate as string),
        new Date(endDate as string)
    );

    response.status(httpStatus.OK).json({
        analytics,
        period: {
            startDate,
            endDate
        }
    });
});

export { getCompletedWorkouts, getExerciseTrends, getWorkoutAnalytics };