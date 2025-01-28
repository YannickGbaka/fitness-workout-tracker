import catchAsync from "../utils/catchAsync.util.ts";
import * as workoutService from '../services/workout.service.ts';

const getCompletedWorkouts = catchAsync(async (request, response)=>{
    const {startDate, endDate} = request.query;
    const userId = request.user?._id;

    const data = await workoutService.completedWorkoutQuery(userId, startDate, endDate);
    response.send(data);
});

export {getCompletedWorkouts};