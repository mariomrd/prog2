import express, {Request, Response, NextFunction} from 'express'; 
//import { createModuleResolutionCache } from 'typescript';
import usersControllers from './components/users/users_controllers';
import likesControllers from './components/likes/likes_controllers';
import postsControllers from './components/posts/posts_controllers';
import commentsControllers from './components/comments/comments_controllers';
import usersMiddlewares from './components/users/users_middlewares';
import postsMiddlewares from './components/posts/posts_middlewares';

const app = express();
const PORT = 3000;

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next();
};

// * TEST *

app.get('/api/v1/health', logger, (req: Request, res: Response) => {
    return res.status(200).json({
        message :`I'm healthy`
    });
});

// * KASUTAJA *

//kasutajate nimekiri
app.get('/api/v1/users', usersControllers.getAllUsers);

//kasutaja loomine
app.post('/api/v1/users', usersMiddlewares.checkCreateUserData, usersControllers.createUser);

//kasutaja otsimine ID alusel
app.get('/api/v1/users/:id', usersControllers.findUserById);

//kasutaja kustutamine
app.delete('/api/v1/users/:id', usersControllers.deleteUser);

//kasutaja andmete muutmine
app.patch('/api/v1/users/:id', usersControllers.changeUserData);

// * POSTITUSTE meeldivaks märkimine *
//postituse otsimine ID alusel ning score++
app.post('/api/v1/posts/:id/like', likesControllers.likePost);

//postituse otsimine ID alusel ning mitte meeldivaks märkimine
app.post('/api/v1/posts/:id/dislike', likesControllers.disLikePost);

// * POSTITUS *

//postituste nimekiri
app.get('/api/v1/posts', postsControllers.getAllPosts);

//postituse otsimine ID alusel
app.get('/api/v1/posts/:id', postsControllers.getPostByID);

//postituse loomine
app.post('/api/v1/posts', postsMiddlewares.checkCreatePost, postsControllers.createPost);

//postituse kustutamine
app.delete('/api/v1/posts/:id', postsControllers.deletePost);

//postituse muutmine
app.patch('/api/v1/posts/:id', postsControllers.modifyPost);

// * KOMMENTAARID *

// kõikide kommentaaride pärimine
app.get('/api/v1/comments', commentsControllers.getAllComments);

// Kommentaar id alusel
app.get('/api/v1/comments/:id', commentsControllers.getCommentByCommentId);

// Postitusega seotud kommentaaride pärimine
app.get('/api/v1/posts/:id/comments', commentsControllers.getCommentsByPostId);

// kommentaari loomine
app.post('/api/v1/comments', commentsControllers.createComment);

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', );





// * PORT *

app.listen(PORT, () => {
    console.log('Server is running');
})