import catchAsync from "../utils/catchAsync.util.ts";
import { validationResult } from "express-validator";
import {status as httpStatus} from 'http-status';
import * as workoutService from "../services/workout.service.ts";


const storeWorkout = catchAsync(async (request, response)=>{
    const results = validationResult(request);
    if(!results.isEmpty()){
        // response.status(httpStatus.BAD_REQUEST).send({errors: results.array()});
        return response.status(httpStatus.BAD_REQUEST).json(results.array());
    }
    const workout = await workoutService.createWorkout(request.body);
    return response.status(httpStatus.CREATED).send(workout);
});

const getWorkouts = catchAsync(async (request, response)=>{
    const workouts = await workoutService.findAll();
    return response.send(workouts);
});

const getWorkout = catchAsync(async (request, response) =>{
    const {id} = request.params;
    const workout = await workoutService.findById(id);
    return response.send(workout);
});

const updateWorkout = catchAsync(async (request, response) =>{
    const results = validationResult(request);
    if(!results.isEmpty()){
        return response.status(httpStatus.BAD_REQUEST).json(results.array());
    }
    const {id} = request.params;
    const workout = await workoutService.update(id, request.body);
    return response.status(httpStatus.OK).json(workout);
});

const removeWorkout = catchAsync(async (request, response)=>{
    const {id} = request.params;
    await workoutService.remove(id);
    response.status(httpStatus.NO_CONTENT).send();
});


export {storeWorkout, getWorkouts, getWorkout, updateWorkout, removeWorkout}















