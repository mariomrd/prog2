import { Request, Response } from "express";
import commentsServices from "./commentsServices";
import usersServices from "../users/usersServices";
import { comments, posts } from "../../mockData";
import { IComment } from "./commentsInterfaces";
import { IUser, IUserSQL } from "../users/usersInterfaces";
import { RowDataPacket } from "mysql2";

const commentsControllers = {
    getCommentsByPostId: (req: Request, res: Response) => {
        const postId = parseInt(req.params.id);
        const comments = commentsServices.commentsByPostId(postId);
        const post = posts.find(element => {
            return element.id === postId;
        });
        if (!post) {
            return res.status(400).json({
                success: false,
                message: `Sellist postitust pole olemas`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Postitusega ${postId} seotud kommentaarid`,
            data: {
                comments,
            },
        });
    },

    createComment: (req: Request, res: Response) => {
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
    },

    getCommentByCommentId: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comment = commentsServices.commentById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: `Kommentaari ei leitud`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Kommentaar IDga ${id} leitud`,
            data: {
                comment,
            },
        });
    },

    getAllComments: async (req: Request, res: Response) => {
        const comments = await commentsServices.getAllComments();
        res.status(200).json({
            success: true,
            message: 'List of all comments',
            comments,
        });

        res.status(200).json({
            success: true,
            message: 'Kõik kommentaarid',
            comments
        });
    }

}

export default commentsControllers;