import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt  from "jsonwebtoken";



export const signup = async (req,res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);


    const newUser= new User({username, email, password:hashedPassword});

    try{
        await newUser.save();
        res.status(201).json("user created successfully"); 
    } catch(error) {
        next( error);  
    }
    
} ;



export const signin = async(req,res,next)=>{
    const {email, password} = req.body;

    try {
        // use findOne() to find email in database
        const validUser = await User.findOne({email});
        // return an error using the middleware created index.js and errorHandler in utils.js
        if (!validUser) return next(errorHandler(404, "User not found!"));
        // use compareSync() to validate password
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if (!validPassword) return next(errorHandler(401,"Wrong credential!"));
        const token = jwt.sign({id: validUser._id }, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;

        res
            .cookie('jwToken', token , {httpOnly : true})
            .status(200)
            .json(rest);
         
    } catch (error) {
        next(error);
    }
} 

