import express from 'express';
import usersControllers from './usersControllers';
import usersMiddlewares from './usersMiddlewares';
import authMiddleware from '../auth/authMiddlewares'

const usersRoutes = express.Router();

usersRoutes
  .get('/:id', usersControllers.getUserById)
  //.post('/register', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
  .get('/', authMiddleware.isAdmin, usersControllers.getAllUsers)
  //.delete('/:id', usersControllers.deleteUser)
  //.patch('/:id', usersControllers.changeUserData)



export default usersRoutes;