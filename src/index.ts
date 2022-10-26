import express from 'express'; 
import usersRoutes from './components/users/usersRoutes';
import likesRoutes from './components/likes/likesRoutes';
import postsRoutes from './components/posts/postsRoutes';
import commentsRoutes from './components/comments/commentsRoutes';
import generalRoutes from './components/general/generalRoutes';
import { logger, loginLogger, } from './components/general/generalMiddlewares';
import authController from './components/auth/authControllers';
import usersMiddlewares from './components/users/usersMiddlewares';
import usersControllers from './components/users/usersControllers';
import authMiddleware from './components/auth/authMiddlewares';

const app = express();
const PORT = 3000;
const apiPath = '/api/v1';

app.use(express.json());
app.use(logger);
app.post(`${apiPath}/login`, loginLogger, authController.login);
app.use(`${apiPath}/health`, logger, generalRoutes);
app.use(authMiddleware.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/posts`, likesRoutes);
app.use(`${apiPath}/posts`, postsRoutes);
app.use(`${apiPath}/`, commentsRoutes);
app.post(`${apiPath}/`, loginLogger, usersMiddlewares.checkCreateUserData, usersControllers.createUser);





// PORT 

app.listen(PORT, () => {
    console.log('Server is running');
})