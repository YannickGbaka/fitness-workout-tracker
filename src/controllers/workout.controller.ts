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

export {storeWorkout}















