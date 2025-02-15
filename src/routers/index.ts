import {Express} from 'express'
import  userRouter  from './user.routes'
import authRouter from './auth.routes'
import currencyRouter from './currencies.routes'

const ROUTES_PREFIX = '/api/v1';

const routes = (app: Express) => {
    //auth routes
    app.use(`${ROUTES_PREFIX}/auth`, authRouter)
    //user routes
    app.use(`${ROUTES_PREFIX}/users`, userRouter)
    //currencies routes
    app.use(`${ROUTES_PREFIX}/currencies`, currencyRouter)
}

export default routes;