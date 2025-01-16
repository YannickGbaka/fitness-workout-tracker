import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.ts';
import helmet from 'helmet';
import {errorHandler, errorConverter} from './middlewares/error.middleware.ts';
import ApiError from './utils/apiErrors.util.ts';
import status from 'http-status';
import authLimiter from './middlewares/rateLimiter.middleware.ts';
import userRouter from './routes/user.route.ts';
import('./strategies/jwt-strategy.ts');
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
// handle error
// send back a 404 error for any unknown api request

app.use((req, res, next) => {
    next(new ApiError(status.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);

export default app;