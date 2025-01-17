import { NextFunction, Request, Response, RequestHandler } from "express";
import { insertNewUser, getUserByEmail } from "../../services/user";

import MY_ACCESS_TOKEN_SECRET from "../../config"


export const register = async (req:Request, res: Response, next:NextFunction ): Promise<any> => {
    try {
        //TODO Validation
        const {  email, password, name } = req.body;
        
        if( !name || !email || !password ) {
            return res.status(422).json({message: 'Please fill in all fields (name , email and password)'})
        }
        const  bcrypt = require("bcryptjs");
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await insertNewUser(name, email, hashedPassword);

        return res.status(201).json({"message": "Registered successfully"})

    } catch (error : any) {
        return res.status(500).json({message: error.message});  
    }
}


export const login = async (req:Request, res: Response): Promise<any> => {
    try {
        //TODO Validation
        const {  email, password } = req.body;
        
        if( !email || !password ) {
            return res.status(422).json({message: 'Please fill in all fields (email and password)'})
        }

      
        const user = await getUserByEmail( email);

        if( !user ){
            return res.status(401).json({message: 'Email or password is invalid'})
        }

        const bcrypt = require("bcryptjs");
        const passwordMatch = await bcrypt.compare(password, user.password)

        if( !passwordMatch ){
            return res.status(401).json({message: 'Email or password is invalid'})
        }
        const jwt = require("jsonwebtoken");
        const accessToken = jwt.sign({userId: user.id}, MY_ACCESS_TOKEN_SECRET, {subject:'accessApi', expiresIn: '1h'} )

        return res.status(200).json({
            id: user.id,
            accessToken
        })

    } catch (error : any) {

           return res.status(500).json({message: error.message});
    
    }
}
