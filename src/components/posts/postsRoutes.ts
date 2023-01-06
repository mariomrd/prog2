import express from 'express';
import postsControllers from './postsControllers';
import postsMiddlewares from './postsMiddlewares';

const postsRoutes = express.Router();

postsRoutes
    .get('/', postsControllers.getAllPosts)
    .get('/:id', postsControllers.getPostById)
    .post('/', postsMiddlewares.checkCreatePost, postsControllers.createPost)
    .delete('/:id', postsControllers.deletePost)
    .patch('/:id', postsControllers.modifyPost)
  



export default postsRoutes;