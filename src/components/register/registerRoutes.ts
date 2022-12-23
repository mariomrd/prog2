import express from 'express';
import registerMiddlewares from './registerMiddlewares';
import registerControllers from './registerControllers';

const registerRoutes = express.Router();

registerRoutes
  .post('/', registerMiddlewares.checkCreateUserData, registerControllers.registerUser)



export default registerRoutes;