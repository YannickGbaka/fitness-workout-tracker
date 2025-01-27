import Workout from "../../mongoose/schemas/workout.schema.ts"
import ApiError from "../apiErrors.util.ts";
import {status as httpStatus} from 'http-status';

const exerciceCreateValidationSchema = {
    name:{
        isString: true,
        isLength: {
            options:{min: 3}
        },
    },
    repsOrDuration:{
        isString: true,
    },
    notes:{
        isString: true,
        optional: true,
    },
    // workoutId:{
    //     in: ['params'],
    //     custom: {
    //         options: async (value)=>{
    //             const workout = Workout.findById(value);
    //             if(!workout){
    //                 throw new ApiError(httpStatus.NOT_FOUND, "Workout id not found");
    //             }
    //             return true;
    //         }
    //     }
    // }
}

export {exerciceCreateValidationSchema};