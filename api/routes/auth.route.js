// Import the Express library
import express from 'express';

// Import the authentication controller methods
import { signin, signup, google, signout } from '../controllers/auth.controller.js';

// Create an instance of the Express router
const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user signin
router.post("/signin", signin);

// Route for Google authentication
router.post("/google", google);

//Route for user signout
router.get('/signout', signout)

// Export the router for use in other parts of the application
export default router;
