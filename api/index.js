// Import necessary modules
import express from 'express'; // Framework for building web applications
import mongoose from 'mongoose'; // MongoDB object modeling tool
import dotenv from 'dotenv'; // Load environment variables from a .env file
import userRouter from './routes/user.route.js'; // Router for user-related routes
import authRouter  from './routes/auth.route.js'; // Router for authentication routes
import cookieParser from 'cookie-parser'; // Parse cookie headers
import cors from 'cors';
import listingRouter from './routes/listing.route.js';
import adminRouter from './routes/admin.route.js'

// Load environment variables from a .env file
dotenv.config();

// Connect to MongoDB using the provided connection string
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err);
    });

// Create an Express application
const app = express(); 

// Parse JSON bodies of incoming requests
app.use(express.json()); 

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Uncomment the following lines to enable CORS (Cross-Origin Resource Sharing)
// CORS is a security feature implemented by web browsers, which allows one domain to make AJAX requests to another domain
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies) to be sent
}));

// Start the Express server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

// Routes for handling user-related operations
app.use("/api/user", userRouter);

// Routes for handling authentication operations
app.use('/api/auth', authRouter);

// Route for handling listing
app.use("/api/listing", listingRouter)

//Route for handling admin operations
app.use("/api/admin", adminRouter);




// Error-handling middleware for handling errors in the application
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode, 
        message
    });
});
