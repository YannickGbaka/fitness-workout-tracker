import { validationResult, matchedData} from "express-validator";
import catchAsync from "../utils/catchAsync.util.ts";
import {status as httpStatus} from 'http-status';
import * as exerciceService from '../services/exercice.service.ts';
import * as workoutService from '../services/workout.service.ts';
import ApiError from "../utils/apiErrors.util.ts";
import * as aiService from '../services/ai.service.ts';


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

const getExercices = catchAsync(async (request, response)=>{
    const {workoutId} = request.params;

    const workout = await workoutService.findById(workoutId);

    if (!workout) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Workout not found');
    }

    const exercices = await exerciceService.findAll(workoutId);
    response.status(httpStatus.OK).send(exercices);
});

const getExercice = catchAsync(async (request, response)=>{
    const {exerciceId, workoutId} = request.params;
    const exercice = await exerciceService.findById(exerciceId);
    response.send(exercice);
});

const updateExercice = catchAsync(async (request, response)=>{
    const results = validationResult(request);
    if(!results.isEmpty()){
        response.status(httpStatus.BAD_REQUEST).send(results.array());
    }

    const {workoutId, exerciceId} = request.params;
    //check if the exercice exists
    const data = matchedData(request);
    const exercice = await exerciceService.update(exerciceId, data);

    response.status(httpStatus.OK).send(exercice);

});

const removeExercice = catchAsync(async (request, response)=>{
    const {exerciceId} = request.params;
    await exerciceService.remove(exerciceId);
    response.status(httpStatus.NO_CONTENT).send();
});

const generateExercices = catchAsync(async (request, response)=>{
    const {workoutId} = request.params;
    const workout = await workoutService.findById(workoutId);
    if(!workout){
        return response.status(httpStatus.NOT_FOUND).send("Workout not found");
    }
    const prompt = `As a certified fitness trainer, generate a list of exercises for a workout session. The exercises must be practical, safe, and suitable for the given workout context. For each exercise, provide the following details in the exact JSON format below :[
            {
                "name": "string (minimum 3 characters)",
                "repsOrDuration": "string (e.g., '3x12 reps' or '45 seconds')",
                "notes": "string (optional form tips or technique instructions)",
                "workoutId": "${workout._id}"
            }
        ]
        The name field must contain a descriptive name with at least 3 characters.
        The repsOrDuration field must specify either repetitions (e.g., "3x12") or duration (e.g., "45 seconds").
        The notes field is optional but should include form/technique tips if provided.
        Include the placeholder "workoutId": "${workout._id}" as-is.
        The exercises should be appropriate for ${workout.title} and create a balanced, effective workout routine.

        Important : Your response must be ONLY a valid JSON array in the specified format. Do not include any additional text, explanations, or variations of the format.
    `;

    const data = await aiService.generateResponse(prompt, "huggingface", "mistralai/Mixtral-8x7B-Instruct-v0.");
    response.status(httpStatus.OK).send(JSON.parse(data));
})

export {storeExercice, getExercices, getExercice, updateExercice, removeExercice, generateExercices};