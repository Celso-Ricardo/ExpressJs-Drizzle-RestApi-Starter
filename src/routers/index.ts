import {Express} from 'express'
import  userRouter  from './user'
import authRouter from './auth'

const ROUTES_PREFIX = '/api/v1';

const routes = (app: Express) => {
    //auth routes
    app.use(`${ROUTES_PREFIX}/auth`, authRouter)
    //user routes
    app.use(`${ROUTES_PREFIX}/users`, userRouter)
   
}



export default routes;