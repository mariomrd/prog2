import express from 'express';
import generalController from './generalControllers';

const generalRoutes = express.Router();

generalRoutes
  //.get('/', generalController.index)
  .get('/', generalController.health);
  //.get('/*',generalController.default);




export default generalRoutes;