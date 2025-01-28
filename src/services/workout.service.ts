import { workerData } from "worker_threads";
import Workout from "../mongoose/schemas/workout.schema.ts";
import ApiError from "../utils/apiErrors.util.ts";
import {status as httpStatus} from 'http-status';

const createWorkout = async (workoutData) =>{
    const workout = await Workout.create(workoutData);
    (await workout).save();
    return workout;
}

const findAll = async()=>{
    const workouts = await Workout.find();
    return workouts;
}

const findById = async(id) =>{
    return await Workout.findById(id);
}
  
const update = async(id, data) =>{
    const workout = await findById(id);
    if (!workout) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout not found');
    }
    Object.assign(workout, data);
    (await workout).save();
    return workout;
}

const remove = async (id) =>{
    const workout = await findById(id);
    if(!workout){
       throw new ApiError(httpStatus.NOT_FOUND, 'Workout not found');
    }
    (await workout).deleteOne();
}

const completedWorkoutQuery = async(userId, startDate = null, endDate = null)=>{
    let query = { userId };
    if(startDate && endDate){
        query.scheduledDate = {
            $gte: new Date(startDate as string),
            $lte: new Date(endDate as string)
        };
    }
    const workouts = await Workout.find(query);
    const totalWorkouts = workouts.length;
    const completedWorkouts = workouts.filter(workout => workout.status === 'completed').length;
    const completionPercentage = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

    return {
        totalWorkouts,
        completedWorkouts,
        completionPercentage
    };
}

export {createWorkout, findAll, findById, update, remove,completedWorkoutQuery };