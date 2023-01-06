import { NextFunction, Request, Response } from "express";
import commentsServices from "./commentsServices";
import usersServices from "../users/usersServices";
//import { comments, posts } from "../../mockData";
import { IComment } from "./commentsInterfaces";
import { IUser, IUserSQL } from "../users/usersInterfaces";
import { RowDataPacket } from "mysql2";

const commentsControllers = {
    getCommentsByPostId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = parseInt(req.params.id, 10);
            console.log(req.params);
            const comments = await commentsServices.commentsByPostId(postId);
            if (!comments) {
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
        } catch (error) {
            next(error)
        }
    },


    createComment: async (req: Request, res: Response) => {
        const { postId, content } = req.body;
        let userId = res.locals.user?.id || null;
        if (!postId || !content) {
          return res.status(400).json({
            success: false,
            message: 'Osa andmevälju on puudu (postId, content)',
          });
        }
    
        const newComment: IComment = {
          userId,
          postId,
          content,
        };
    
        const id: number = await commentsServices.createComment(newComment);
    
        return res.status(201).json({
          success: true,
          message: `Kommentaar IDga ${id} loodud`,
        });
      },
      deleteComment: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const result = await commentsServices.deleteComment(id);
        if (!result) {
          return res.status(404).json({
            success: false,
            message: 'Kommentaari ei leitud',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Kommentaar kustutatud!',
        });
      },

    getCommentByCommentId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const comment = await commentsServices.commentById(id);
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: `c`,
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