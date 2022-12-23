import express from 'express'; 
import usersRoutes from './components/users/usersRoutes';
//import likesRoutes from './components/likes/likesRoutes';
import postsRoutes from './components/posts/postsRoutes';
//import commentsRoutes from './components/comments/commentsRoutes';
import generalRoutes from './components/general/generalRoutes';
import { logger, loginLogger, } from './components/general/generalMiddlewares';
import authController from './components/auth/authControllers';
import usersMiddlewares from './components/users/usersMiddlewares';
import usersControllers from './components/users/usersControllers';
import authMiddleware from './components/auth/authMiddlewares';
import config from './apiConfig';
import registerRoutes from './components/register/registerRoutes';
import commentsRoutes from './components/comments/commentsRoutes';

const app = express();
const { apiPath } = config;

//mida vaja teha
//uues kasutaja registreermisel ei peaks olema vaja sisse logitud olla


app.use(express.json());
//app.use(logger);
//app.use(`${apiPath}/`, logger, generalRoutes);
app.use(`${apiPath}/health`, logger, generalRoutes);
app.use(`${apiPath}/register`, registerRoutes);
app.post(`${apiPath}/login`, loginLogger, authController.login);
app.use(authMiddleware.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
//app.use(`${apiPath}/posts`, likesRoutes);
app.use(`${apiPath}/posts`, postsRoutes);
app.use(`${apiPath}/`, commentsRoutes);
//app.post(`${apiPath}/`, loginLogger, usersMiddlewares.checkCreateUserData, usersControllers.createUser);

export default app;



