import express from 'express';
import commentsControllers from './commentsControllers';

const  commentsRoutes = express.Router();

commentsRoutes
    .get('/', commentsControllers.getAllComments)
    .get('/:id', commentsControllers.getCommentByCommentId)    
    .post('/', commentsControllers.createComment)
    .delete('/:id', commentsControllers.deleteComment)
    .get('/post/:id', commentsControllers.getCommentsByPostId)



export default commentsRoutes;