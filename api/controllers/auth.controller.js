// Import necessary modules and files
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from "jsonwebtoken";

// Controller for user signup
export const signup = async (req, res, next) => {
    // Destructure values from the request body
    const { username, email, password } = req.body;
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        // Save the new user to the database
        await newUser.save();
        // Respond with a success message
        res.status(201).json("user created successfully");
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
};

// Controller for user signin
export const signin = async (req, res, next) => {
    // Destructure values from the request body
    const { email, password } = req.body;

    try {
        // Find user by email in the database
        const validUser = await User.findOne({ email });

        // Return an error if user not found
        if (!validUser) return next(errorHandler(404, "User not found!"));

        // Validate the password using compareSync()
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // Return an error if the password is invalid
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

        // Sign a JWT token with the user's id
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Exclude the password from the response
        const { password: pass, ...rest } = validUser._doc;

        // Set the token as an HttpOnly cookie and respond with the user information
        res
            .cookie('jwToken', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
};

// Controller for Google authentication
export const google = async (req, res, next) => {
    try {
        // Check if the user with the provided email already exists
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            // If user exists, sign a JWT token and respond with user information
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;

            res.cookie('jwToken', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            // If user doesn't exist, generate a password and create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });

            // Save the new user to the database
            await newUser.save();

            // Sign a JWT token and respond with the new user information
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie('jwToken', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
}


//Controller for user signout
export const signout = async (req, res, next) =>{
    try{
        res.clearCookie('jwToken');
        res.status(200).json('user has been logged out!');
    } 
    catch(error){
        next(error)
    }
}