import {Router} from 'express';
import * as exerciceController from '../controllers/exercice.controller.ts';
import { checkSchema, param, body } from 'express-validator';
import { exerciceCreateValidationSchema, exerciceUpdateValidationSchema } from '../utils/validations/exercice.validation.ts';

const exerciceRouter = Router({mergeParams: true});

exerciceRouter.route('/').post(checkSchema(exerciceCreateValidationSchema), exerciceController.storeExercice)
    .get(param("workoutId").notEmpty().withMessage("The workoutId is not defined"), exerciceController.getExercices);

exerciceRouter.route('/:exerciceId')
    .get(param('exerciceId').notEmpty().withMessage("The exercice Id is not defined"), exerciceController.getExercice)
    .put(checkSchema(exerciceUpdateValidationSchema), exerciceController.updateExercice)
    .delete(exerciceController.removeExercice);

exerciceRouter.post('/generate', param('workoutId').notEmpty().withMessage("The workout Id is not defined") ,exerciceController.generateExercices);

export default exerciceRouter;