// Define a utility function for creating and throwing errors
export const errorHandler = (statusCode, message) => {
    // Create a new Error object
    const error = new Error();
    
    // Set the status code and message on the error object
    error.statusCode = statusCode;
    error.message = message;
    
    // Throw the error, causing the application to stop execution and handle the error
    throw error;
};
