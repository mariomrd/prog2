import express from 'express';
import statisticsControllers from './statisticsControllers';

const likesRoutes = express.Router();

likesRoutes
  .get('/users/top10active', statisticsControllers.top10active)
  .get('/users/genders', statisticsControllers.genders)
  .get('/users/registered', statisticsControllers.registered)


export default likesRoutes;