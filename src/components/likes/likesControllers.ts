import { NextFunction, Request, Response } from "express";
import pool from "../../database";

const likesControllers = {
    likePost: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = res.locals.user?.id;
            const post = req.params.id;
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: `Postitust ei leitud`,
                });
            }
            const addLike = {
                post_id: post,
                user_id: user,
                creation_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
            await pool.query('INSERT INTO liking SET ?;', addLike)
            return res.status(200).json({
                success: true,
                message: `Postitus ${post} on meeldivaks märgitud`
            });
        } catch (error) {
            next(error)
        }
    },
    unlikePost: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = res.locals.user?.id;
            const post = req.params.id;
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: `Postitust ei leitud`,
                });
            }
            await pool.query(`DELETE FROM liking WHERE post_id=? AND user_id=?;`, [post, user]);
            return res.status(200).json({
                success: true,
                message: `Postituse meeldivaks märkimine on eemaldatud`
            });
        } catch (error) {
            next(error)
        }
    }
    
}

export default likesControllers;