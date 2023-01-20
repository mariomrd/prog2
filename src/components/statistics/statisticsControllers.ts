import { NextFunction, Request, Response } from "express";
import pool from "../../database";

const likesControllers = {
    //users with the most postings
    top10active: async (req: Request, res: Response, next: NextFunction) => {
        try {

            let top10active = await pool.query(`SELECT user.id, user.firstname, user.lastname, count(post.id) AS Posts
                FROM comment INNER JOIN
                    post ON comment.postId = post.id INNER JOIN
                    user ON post.userId = user.id
                GROUP BY user.id, user.firstname, user.lastname
                ORDER BY Posts desc
                LIMIT 10; `)
            return res.status(200).json({
                success: true,
                message: `Top 10 aktiivsed kasutajad.`,
                top10active
            });
        } catch (error) {
            next(error)
        }
    },
    //gets genders count
    genders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let genders = await pool.query(`SELECT gender.name AS Gender, Count(user.id) AS Users
            FROM User INNER JOIN
                Gender ON user.gender = gender.id
            GROUP BY Gender.Name
            ORDER BY Users desc;`);
            return res.status(200).json({
                success: true,
                message: `Sooline jaotuvus`,
                genders
            });
        } catch (error) {
            next(error)
        }
    },
    //day with most users registered
    registered: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let added = await pool.query(`SELECT CAST(creation_time AS Date) AS Date, Count(id) AS Count
            FROM User
        GROUP BY CAST(creation_time AS Date)
        ORDER BY Count DESC;`);
            return res.status(200).json({
                success: true,
                message: `Enim liitunud kasutajatega päevad`,
                added
            });
        } catch (error) {
            next(error)
        }
    }

}

export default likesControllers;