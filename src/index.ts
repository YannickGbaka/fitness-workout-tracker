import express from 'express';
import passport from 'passport';
import cors from 'cors';
import authRouter from './routes/auth.route.ts';
import helmet from 'helmet';
import {errorHandler, errorConverter} from './middlewares/error.middleware.ts';
import ApiError from './utils/apiErrors.util.ts';
import status from 'http-status';
import authLimiter from './middlewares/rateLimiter.middleware.ts';
import userRouter from './routes/user.route.ts';
import workoutRouter from './routes/workout.route.ts';
import exerciceRouter from './routes/exercice.route.ts';
import reportRouter from './routes/report.route.ts';
import('./strategies/jwt-strategy.ts');
import analyticsRouter from './routes/analytics.route.ts';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.query());
// set security HTTP headers
app.use(helmet());

app.get('/', (request, response)=>{
    return response.status(200).json({message: 'Hello world'});
})
app.use('/api/v1/auth', authLimiter, authRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1/workouts', workoutRouter);
app.use('/api/v1/workouts/:workoutId/exercices', exerciceRouter);
app.use('/api/v1/reports', passport.authenticate('jwt', {session: false}), reportRouter);
app.use('/api/v1/analytics', passport.authenticate('jwt', {session: false}), analyticsRouter);


// handle error
// send back a 404 error for any unknown api request

app.use((req, res, next) => {
    next(new ApiError(status.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);

export default app;