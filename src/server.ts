import app from './index.ts'
import { config } from 'dotenv';

// Load environment variables
config();

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});