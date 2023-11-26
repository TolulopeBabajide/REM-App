import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware function to verify JWT
export const verifyToken = (req, res, next) => {
    // Extract the JWT from the request cookies
    const token = req.cookies.jwToken;

    // If no token is present, return an unauthorized error
    if (!token) return next(errorHandler(401, 'Unauthorized'));

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If there's an error in verification, return a forbidden error
        if (err) return next(errorHandler(403, 'Forbidden'));

        // Attach the decoded user information to the request object
        req.user = user;

        // Move to the next middleware or route handler
        next();
    });
};
