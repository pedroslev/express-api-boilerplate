import { Router } from 'express'
import dotenv from 'dotenv'

dotenv.config()
//--------Controller Functions--------
//import {} from './controllers.js';

//--------Authentication--------
const appStatus = new Router();


//----------------------------EXPORTS----------------------------
export {
    appStatus,
    configuration,
    products,
    authentication
}