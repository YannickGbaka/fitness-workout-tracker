import { findById as findUserById } from "../../services/user.service.ts"; 
import ApiError from "../apiErrors.util.ts";
import {status as httpStatus} from 'http-status';

const workoutValidationSchema = {
    title:{
        isString: true,
        isLength:{
            options: {min: 3, max: 100},
            errorMessage: "Title must be a string between 3 and 100 characters"
        }
    },
    userId: {
        isString: true,
        custom: {
            options: async (value)=>{
                const user = await findUserById(value);
                if(!user){
                    throw new ApiError(httpStatus.NOT_FOUND, "User was not found");
                }
                return true;
            }
        }
    },
    scheduledDate: {
        isDate: true,
    },
}

// Add new update validation schema where all fields are optional
const workoutUpdateValidationSchema = {
    title: {
        optional: true,
        isString: true,
        isLength: {
            options: {min: 3, max: 100},
            errorMessage: "Title must be a string between 3 and 100 characters"
        }
    },
    userId: {
        optional: true,
        isString: true,
        custom: {
            options: async (value)=>{
                const user = await findUserById(value);
                if(!user){
                    throw new ApiError(httpStatus.NOT_FOUND, "User was not found");
                }
                return true;
            }
        }
    },
    scheduledDate: {
        optional: true,
        isDate: true,
    },
    status: {
        optional: true,
        isIn: {
            options: [['pending', 'completed']],
            errorMessage: "Status must be either 'pending' or 'completed'"
        }
    }
}

export { workoutValidationSchema, workoutUpdateValidationSchema };  