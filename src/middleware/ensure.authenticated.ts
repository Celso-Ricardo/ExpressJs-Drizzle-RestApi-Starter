import { NextFunction, Request, Response } from "express";
import {MY_ACCESS_TOKEN_SECRET} from "../config"

export function ensureAuthenticated (req:Request, res:Response, next:NextFunction) : any {
    const accessToken = req.headers.authorization;
    
    if(!accessToken){
        return res.status(401).json({message:'Access token not found'})
    }

    try{
        const jwt = require("jsonwebtoken");
        const decodedAccessToken = jwt.verify(accessToken, MY_ACCESS_TOKEN_SECRET);
        req.headers.user = decodedAccessToken.userId
        next();
    }catch(error){
        return res.status(401).json({message:'Access token invalid or expired'})
    }
    
}