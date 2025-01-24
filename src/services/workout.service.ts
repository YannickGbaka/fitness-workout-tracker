import Workout from "../mongoose/schemas/workout.schema.ts";

const createWorkout = async (workoutData) =>{
    const workout = await Workout.create(workoutData);
    (await workout).save();
    return workout;
}

const findAll = async()=>{
    const workouts = await Workout.find();
    return workouts;
}

export {createWorkout, findAll};