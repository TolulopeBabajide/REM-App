// Import necessary modules and files
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// Controller for a test route
export const test = (req, res) => {
    res.json({
        message: "hello world",
    });
}

// Controller for updating user information
export const updateUser = async (req, res, next) => {
    // Check if the user is attempting to update their own account
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only update your own account"));
    try {
        // Hash the password if a new password is provided
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Update user information in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });

        // Exclude the password from the response
        const { password, ...rest } = updatedUser._doc;

        // Respond with the updated user information
        res.status(200).json(rest);
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
};

// Controller for deleting a user account
export const deleteUser = async (req, res, next) => {
    // Check if the user is attempting to delete their own account
    if (req.user.id !== req.params.id)
        return next(errorHandler(403, "You can only delete your own account"));
    try {
        // Delete the user from the database
        await User.findByIdAndDelete(req.params.id);
        // Respond with a success message
        res.clearCookie('jwToken');
        res.status(200).json("user has been deleted!")
        
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
}
