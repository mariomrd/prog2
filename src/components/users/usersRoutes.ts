import express from 'express';
import usersControllers from './usersControllers';
import usersMiddlewares from './usersMiddlewares';

const usersRoutes = express.Router();

usersRoutes
  .get('/', usersControllers.getAllUsers)
  .post('/', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
  .get('/:id', usersControllers.findUserById)
  .delete('/:id', usersControllers.deleteUser)
  .patch('/:id', usersControllers.changeUserData)



export default usersRoutes;