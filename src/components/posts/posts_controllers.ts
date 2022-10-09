import { Request, Response } from "express";
import { posts, users } from "../../mockData";
import { IUser } from "../users/users_interfaces";
import { IPost } from "./posts_interfaces";

const postsControllers = {
    getAllPosts: (req: Request, res: Response) => {
        return res.status(200).json({
            success: true,
            message: 'postituste nimekiri',
            posts
        });
    },
    getPostByID: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = posts.find(element => {
            return element.id === id;
        });
        if (!post) {
             return res.status(404).json({
                success: false,
                message: 'Postitatud pilti ei leitud'
            })
        }
        let user: IUser | undefined = users.find(element => element.id === post.userId);
        if (!user) {
            user = {
                id: 0,
                firstName: 'User missing',
                lastName: 'User missing',
                email: 'User missing',
                password: 'User missing'
            }
        }
        const postWithUserName = {
            id: post.id,
            title: post.title,
            description: post.description,
            picture: post.picture,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            score: post.score,
        }
        return res.status(201).json({
            success: true,
            message: `Postitus IDga ${id} on leitud`,
            data: {
                post: postWithUserName
            }
        });
    },

    createPost: (req: Request, res: Response) => {
        const { title, description, picture, userId, score } = req.body;
        const id = posts.length + 1;
        const newPost: IPost = {
            id,
            title,
            userId,
            description,
            picture,
            score,
        };
        posts.push(newPost);
        return res.status(201).json({
            success: true,
            message: `Postitus pealkirjaga '${newPost.title}' ja IDga ${newPost.id} on loodud.`
        });
    },

    modifyPost: (req: Request, res: Response) => {
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
}

export default postsControllers;