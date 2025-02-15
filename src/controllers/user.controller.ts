import { getUserById, insertNewUser, getAllUsers } from "../services/user";
import type { User } from "../db/postgresql_schema";
import { NextFunction, Request, Response } from 'express-serve-static-core'


export const getUsers = async (req:Request, res:Response, next:NextFunction ): Promise<any> => {
    
    try {

        const users = await getAllUsers();

        if(users) res.status(200).json({users}) ;

        res.status(401).json("Users not found in our database");

    } catch (error: any) {
 
        res.status(401).json({message:error.message});
        res.end()
    }

}

export const currentUser = async (req:Request, res:Response, next:NextFunction ) : Promise<any> => {

    const userId = req.user;
    
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
        res.status(500).json({message: error.message})
        res.end()
    }
}