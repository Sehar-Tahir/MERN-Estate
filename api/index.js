import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js'

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB Connected!");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


//middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({success: false, statusCode, message});
});


app.listen(3000, () => console.log("Server is running on port: 3000"));