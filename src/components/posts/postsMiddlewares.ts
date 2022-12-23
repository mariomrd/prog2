import { Request, Response, NextFunction } from "express";

const postsMiddlewares = {
    checkCreatePost: (req: Request, res: Response, next: NextFunction) => {
        const { title, description, userId } = req.body;
        if (!title || !description ) {
            return res.status(400).json({
                success: false,
                message: 'Pead lisama pildi koos kirjeldusega'
            });
        }
        next();
    }
};

export default postsMiddlewares;