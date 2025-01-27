import { validationResult } from "express-validator";
import catchAsync from "../utils/catchAsync.util.ts";
import {status as httpStatus} from 'http-status';
import * as exerciceService from '../services/exercice.service.ts';
import * as workoutService from '../services/workout.service.ts';
import ApiError from "../utils/apiErrors.util.ts";

const storeExercice = catchAsync(async (request, response)=>{
    const results = validationResult(request);
    if(!results.isEmpty()){
        response.status(httpStatus.BAD_REQUEST).send(results.array());
    }
    const {workoutId} = request.params;
    
    const workout = await workoutService.findById(workoutId);
    
    if (!workout) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout not found');
    }

    const data = { ...request.body, workoutId }; 
    const exercice = await exerciceService.createExercice(data);

    response.status(httpStatus.CREATED).send(exercice);
}); 


export {storeExercice};