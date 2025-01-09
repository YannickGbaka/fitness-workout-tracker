import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.ts';

const app = express();

app.use(cors());

app.get('/', (request, response)=>{
    return response.status(200).json({message: 'Hello world'});
})
app.use('/api/v1/auth', authRouter);
export default app;