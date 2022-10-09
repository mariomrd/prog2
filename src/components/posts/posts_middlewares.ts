import { Request, Response, NextFunction } from "express";

const postsMiddlewares = {
    checkCreatePost: (req: Request, res: Response, next: NextFunction) => {
        const { title, description, picture, userId, score } = req.body;
        if (!title || !picture || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Pead lisama pildi koos pealkirjaga'
            });
        }
        next();
    }
};

export default postsMiddlewares;