import {Router} from 'express';
import * as exerciceController from '../controllers/exercice.controller.ts';
import { checkSchema } from 'express-validator';
import { exerciceCreateValidationSchema } from '../utils/validations/exercice.validation.ts';

const exerciceRouter = Router({mergeParams: true});

exerciceRouter.route('/').post(checkSchema(exerciceCreateValidationSchema), exerciceController.storeExercice);


export default exerciceRouter;