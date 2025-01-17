import { getUserById, insertNewUser } from "../services/user";
import { NextFunction, Request, Response } from 'express'


export const getAllUsers =  (req:Request, res:Response, next:NextFunction ) => {
    res.status(200).json("hiha");  
}

export const currentUser = async (req:Request, res:Response, next:NextFunction ) : Promise<any> => {

    const userId = req.headers.user;
    
    try {

        const user = await getUserById(Number(userId));

        if(user){
            return res.status(200).json({
                id:user.id,
                name:user.name,
                email:user.email
            })
        }

        
    } catch (error: any) {
        return res.status(500).json({message: error.message})
    }
}