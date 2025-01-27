import Exercice from "../mongoose/schemas/exercice.schema.ts";
import ApiError from "../utils/apiErrors.util.ts";
import {status as httpStatus} from 'http-status';
const createExercice = async (exerciceData)=>{
    const exercice = await Exercice.create(exerciceData);
    await exercice.save();
    return exercice;
}

const findAll = async(workoutId)=>{
    const exercices = await Exercice.find({workoutId});
    return exercices;
}

const findById = async(id)=>{
    return await Exercice.findById(id);
}

const update = async(id, newData)=>{
    
    const exercice = await findById(id);

    if (!exercice) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercice not found');
    }

    Object.assign(exercice, newData);
    await exercice.save();
    
    return exercice;
}

export {createExercice, findAll, findById, update};