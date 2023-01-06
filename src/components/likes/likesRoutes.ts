import express from 'express';
import likesControllers from './likesControllers';

const likesRoutes = express.Router();

likesRoutes
  .post('/:id/like', likesControllers.likePost)
  .post('/:id/unlike', likesControllers.unlikePost)


export default likesRoutes;