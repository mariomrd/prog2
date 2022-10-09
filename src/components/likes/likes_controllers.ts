import { Request, Response } from "express";
import { posts, users } from "../../mockData";
import { IUser } from "../users/users_interfaces";

const likesControllers = {
    likePost: (req: Request, res: Response) => {
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
        post.score = post.score + 1
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
            message: `Postitus IDga ${id} on leitud ning score++`,
            data: {
                post: postWithUserName
            }
        });
    },
    disLikePost: (req: Request, res: Response) => {
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
            score: post.score - 1
        }
        return res.status(201).json({
            success: true,
            message: `Postitus IDga ${id} on leitud ning score--`,
            data: {
                post: postWithUserName
            }
        });
    }
}

export default likesControllers;