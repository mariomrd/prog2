import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import config from './apiConfig';
import usersRoutes from './components/users/usersRoutes';
import likesRoutes from './components/likes/likesRoutes';
import commentsRoutes from './components/comments/commentsRoutes';
import generalRoutes from './components/general/generalRoutes';
import { logger, loginLogger, } from './components/general/generalMiddlewares';
import authController from './components/auth/authControllers';
import authMiddleware from './components/auth/authMiddlewares';
import postsRoutes from './components/posts/postsRoutes';
import registerRoutes from './components/register/registerRoutes';


const app = express();
const { apiPath } = config;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:9000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true //enableb cookied
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}))
app.use(logger);
app.use(`${apiPath}/`, logger, generalRoutes);
app.use(`${apiPath}/health`, logger, generalRoutes);
app.use(`${apiPath}/register`, registerRoutes);
app.use(`${apiPath}/users`, usersRoutes);
/* app.use(`${apiPath}/login`, (req: Request, res: Response) => {
    if (req.session) {
        res.send({loggedIn: true})
    } else {
        res.send({loggedIn: false})
    }
}); */
app.use(`${apiPath}/login`, loginLogger, authController.login); //panin use
/* app.use(authMiddleware.isLoggedIn); */

app.use(`${apiPath}/posts`, likesRoutes);
app.use(`${apiPath}/posts`, postsRoutes);
app.use(`${apiPath}/comments`, commentsRoutes);
/* app.post(`${apiPath}/`, loginLogger, usersMiddlewares.checkCreateUserData, usersControllers.createUser); */

export default app;



