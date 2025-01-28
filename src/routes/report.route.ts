import {Router} from 'express';
import * as reportController from '../controllers/report.controller.ts';
const reportRouter = Router();

reportRouter.get('/completion', reportController.getCompletedWorkouts);

export default reportRouter;