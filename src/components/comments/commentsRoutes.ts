import express from 'express';
import commentsControllers from './commentsControllers';

const  commentsRoutes = express.Router();

commentsRoutes
    .get('/comments', commentsControllers.getAllComments)
    .get('/comments/:id', commentsControllers.getCommentByCommentId)
    .get('/posts/:id/comments', /* commentsControllers.getCommentsByPostId */)
    //.post('/comments', commentsControllers.createComment)
    //.delete('/comments/:id', );



export default commentsRoutes;