import app from './index.ts'
import { config } from 'dotenv';

const PORT = process.env.PORT || 3006;

app.listen(PORT, ()=> console.log('Server is running on port ' + PORT))