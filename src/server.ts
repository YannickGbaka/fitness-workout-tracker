import app from './index.ts'
import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config();

const PORT = process.env.PORT || 3006;

mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});