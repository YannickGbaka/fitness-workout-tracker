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
}

const exerciceUpdateValidationSchema = {
    name:{
        isString: true,
        optional: true,
    },
    repsOrDuration: {
        isString:  true,
        optional: true,
    },
    notes: {
        isString: true,
        optional: true,
    },
    // workoutId:{
    //     isObject: true,
    //     optional: true
    // }
}

export {exerciceCreateValidationSchema, exerciceUpdateValidationSchema};