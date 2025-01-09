import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (request, response)=>{
    return response.status(200).json({message: 'Hello world'});
})

export default app;