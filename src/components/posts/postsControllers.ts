import { NextFunction, Request, Response } from "express";
import { FieldPacket, ResultSetHeader } from 'mysql2';
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
            //console.log("getuserPOSTidcontroller:", post)
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
            title, description,} = req.body;
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

    /*modifyPost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const {title, description, picture} = req.body;
        const post = posts.find(element => {
            return element.id === id;
        });
        if (!post) {
             return res.status(404).json({
                success: false,
                message: 'Postitust ei leitud'
            })
        }
        if (!title && !description && !picture) {
            return res.status(400).json({
               success: false,
               message: 'Midagi pole muuta'
           })
        }
        if (title) post.title = title;
        if (description) post.description = description;
        if (picture) post.picture = picture;
       
     
     
        return res.status(201).json({
            success: true,
            message: `postitus muudetud`,
            data: {
                id: post.id,
                title: post.title,
                description: post.description,
                picture: post.picture,
            }
        });
    },
    
    deletePost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = posts.findIndex(element => element.id === id);
        if (index === -1) {
             return res.status(404).json({
                success: false,
                message: 'Postitust ei leitud'
            })
        }
        posts.splice(index, 1);
         return res.status(201).json({
            success: true,
            message: `Postitus kustutatud`
        });
    }
    }*/
};
export default postsControllers;