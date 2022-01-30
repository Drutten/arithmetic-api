import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tasksRoute from './routes/tasks.js';

dotenv.config();

const app = express();

app.use(express.json()); // express parser
app.use(cors());

// routes
app.use('/api/tasks', tasksRoute);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}))
.catch((err) => console.log(err.message));