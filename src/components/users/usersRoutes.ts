import express from 'express';
import usersControllers from './usersControllers';
import authMiddleware from '../auth/authMiddlewares'

const usersRoutes = express.Router();

usersRoutes
  .get('/:id', usersControllers.getUserById)
  .get('/', authMiddleware.isAdmin, usersControllers.getAllUsers)
  .delete('/:id', usersControllers.deleteUser)
  .patch('/:id', usersControllers.changeUserData)



export default usersRoutes;