import Exercice from "../mongoose/schemas/exercice.schema.ts";

const createExercice = async (exerciceData)=>{
    const exercice = await Exercice.create(exerciceData);
    await exercice.save();
    return exercice;
}

export {createExercice};