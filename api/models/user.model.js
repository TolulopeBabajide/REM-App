// Import the mongoose library
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    // Define the "username" field in the schema
    username: {
        type: String,       // Data type is String
        required: true,     // Field is required
        unique: true,       // Value must be unique across all documents in the collection
    },
    
    // Define the "email" field in the schema
    email: {
        type: String,       // Data type is String
        required: true,     // Field is required
        unique: true,       // Value must be unique across all documents in the collection
    },
    
    // Define the "password" field in the schema
    password: {
        type: String,       // Data type is String
        required: true,     // Field is required
    },

    // Define the "avatar" field in the schema
    avatar: {
        type: String,       // Data type is String
        default: "https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA="
        // Default value is a placeholder image URL
    },

    role:{
        type: String,
        default: "user",
    },
}, {timestamps: true}); // Add timestamps to track document creation and modification times

// Create a Mongoose model named "User" based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
