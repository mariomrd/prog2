import { NextFunction, Request, Response } from "express";
import commentsServices from "./commentsServices";
import usersServices from "../users/usersServices";
//import { comments, posts } from "../../mockData";
import { IComment } from "./commentsInterfaces";
import { IUser, IUserSQL } from "../users/usersInterfaces";
import { RowDataPacket } from "mysql2";

const commentsControllers = {
    /*getCommentsByPostId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const comments = await commentsServices.commentsByPostId(id);
            console.log("kas siia")
            if (!comments) {
                return res.status(400).json({
                    success: false,
                    message: `Sellist postitust pole olemas`,
                });
            }
            return res.status(200).json({
                success: true,
                message: `Postitusega ${id} seotud kommentaarid`,
                data: {
                    comments,
                },
            });
        } catch (error) {
            next(error)
        }
    },*/


    /*createComment: (req: Request, res: Response) => {
        const { postId, content } = req.body;
        let { userId } = req.body;
        if (!postId || !content) {
            return res.status(400).json({
                success: false,
                message: `Mingid andmed on puudu`,
            });
        }
        if (!userId) userId = null;
        const id = comments.length + 1;
        const comment: IComment = {
            id,
            userId,
            postId,
            content,
        };
        comments.push(comment);
    
        return res.status(201).json({
            success: true,
            message: `Kommentaar IDga ${comment.id} loodud`,
        });
    },
    deleteComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = comments.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Kommentaari ei leitud`,
            });
        }
        comments.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `Kommentaar kustutatud`,
        });
    },*/

    getCommentByCommentId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const comment = await commentsServices.commentById(id);
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: `Kommentaari ei leitud`,
                });
            }
            return res.status(200).json({
                success: true,
                message: `Kommentaar IDga ${id} leitud`,
                data: { comment }
            });
        } catch (error) {
            next(error)
        }
    },

    getAllComments: async (req: Request, res: Response): Promise<any> => {
        const comments = await commentsServices.getAllComments();
        const slicedComments = comments.slice(0, 25);
        res.status(200).json({
            success: true,
            message: 'List of all comments/ 25 firstones',
            comments: slicedComments
        });
    }

}

export default commentsControllers;