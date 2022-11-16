import express from 'express';
import usersControllers from './usersControllers';
import usersMiddlewares from './usersMiddlewares';
import authMiddleware from '../auth/authMiddlewares'

const usersRoutes = express.Router();

usersRoutes
  .get('/:id', usersControllers.getUserById)
  .get('/', /*authMiddleware.isAdmin,*/ usersControllers.getAllUsers)
  .post('/', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
  .delete('/:id', usersControllers.deleteUser)
  .patch('/:id', usersControllers.changeUserData)



export default usersRoutes;