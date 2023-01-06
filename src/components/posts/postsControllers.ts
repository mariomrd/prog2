import { NextFunction, Request, Response } from "express";
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import pool from "../../database";
//import { posts, users } from "../../mockData";
import { IUserWithoutRole } from "../users/usersInterfaces";
import { INewPost, INewPostSQL, IPost, IPostSQL } from "./postsInterfaces";
import postsServices from "./postsServices";

const postsControllers = {
    getAllPosts: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const posts = await postsServices.getAllPosts();
        res.status(200).json({
            success: true,
            message: 'List of posts',
            posts

        });
    },
    getPostById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const post = await postsServices.findPostById(id);
            if (!post) throw new Error('Post not found');
            return res.status(200).json({
                success: true,
                message: `Post with id ${id}`,
                data: {
                    post
                }
            });
        } catch (error) {
            next(error);
        }
    },
    createPost: async (req: Request, res: Response) => {
        const {
            title, description, } = req.body;
        const userId = res.locals.user?.id;
        if (!title || !description || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Pealkiri, sisu või kasutaja id on puudu',
            });
        }
        const newPost: INewPostSQL = {
            userId,
            title,
            description,
            location: "wtf"
        };
        const id = await postsServices.createPost(newPost);
        return res.status(201).json({
            success: true,
            message: `Post with id ${id} created`,
        });
    },
    deletePost: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const result = await postsServices.deletePost(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Postitust ei leitud',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Postitus kustutatud',
        });
    },
    modifyPost: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const { title, description, location } = req.body;
        const post = await postsServices.findPostById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Postitust ei leitud',
            });
        }
        if (!title && !description && !location) {
            return res.status(400).json({
                success: false,
                message: 'Pole midagi muuta',
            });
        }
        const postToUpdate: any = {
            id,
            title,
            description,
            location
        };

        await postsServices.modifyPost(postToUpdate);

        return res.status(200).json({
            success: true,
            message: 'Postitus uuendatud!',
        });
    },

};
export default postsControllers;