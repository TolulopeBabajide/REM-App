import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter  from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log(err)
});

const app = express(); 
app.use(express.json()); 

app.use(cookieParser());

//Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies) to be sent
  }));

app.listen(3000,()=>{
    console.log('server is running on port 3000!')
});



app.use("/api/user", userRouter);

app.use('/api/auth', authRouter);



// create middleware
app.use((err, req, res, next)=>{
    const statusCode= err.statusCode||500;
    const message= err.message|| "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode, 
        message
    })
}) 