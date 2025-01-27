import Exercice from "../mongoose/schemas/exercice.schema.ts";

const createExercice = async (exerciceData)=>{
    const exercice = await Exercice.create(exerciceData);
    await exercice.save();
    return exercice;
}

const findAll = async(workoutId)=>{
    const exercices = await Exercice.find({workoutId});
    return exercices;
}
export {createExercice, findAll};