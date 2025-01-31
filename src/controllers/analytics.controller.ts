import catchAsync from "../utils/catchAsync.util.ts";
import { status as httpStatus } from 'http-status';
import * as analyticsService from '../services/exerciseAnalytics.service.ts';
import ApiError from "../utils/apiErrors.util.ts";

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

    response.status(httpStatus.OK).json(trends);
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

    response.status(httpStatus.OK).json(analytics);
});

export {
    getExerciseTrends,
    getWorkoutAnalytics
}; 