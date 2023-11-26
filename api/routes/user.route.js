// Import the Express library
import express from "express";

// Import the user controller methods
import { deleteUser, test, updateUser } from "../controllers/user.controller.js";

// Import the middleware function to verify tokens
import { verifyToken } from "../utils/verifyToken.js";

// Create an instance of the Express router
const router = express.Router();

// Define a GET route for testing purposes
router.get('/test', test);

// Define a POST route for updating a user's information
// The "verifyToken" middleware ensures that the user is authenticated
router.post('/update/:id', verifyToken, updateUser);

// Define a DELETE route for deleting a user
// The "verifyToken" middleware ensures that the user is authenticated
router.delete('/delete/:id', verifyToken, deleteUser);

// Export the router for use in other parts of the application
export default router;
