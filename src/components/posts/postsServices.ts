import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import authServices from "../auth/authServices";
import { INewPost, INewPostSQL, IPost, IPostSQL } from "./postsInterfaces";



const postsServices = {
    findPostById: async (id: any) => {
        const [post]: [IPostSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM post WHERE id=?`, [id]);
        return post[0];
    },
    getAllPosts: async () => {
        const [posts]: [IPostSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM post`);
        return posts;
    },
    deletePost: async (id: number): Promise<Boolean> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE post SET deletedDate = ? WHERE postId = ?;', [new Date().toISOString().slice(0, 19).replace('T', ' '), id]);
        if (result.affectedRows < 1) {
            return false;
        }
        return true;
    },
    createPost: async (post: INewPostSQL): Promise<number> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO post SET ?;', [post]);
        return result.insertId;
    },
    modifyPost: async (postToUpdate: IPostSQL) => {
        const {
            id, title, description, location
        } = postToUpdate;
        const post = await postsServices.findPostById(id!);

        const update = {
            title: title || post.title,
            description: description || post.description,
            location: location || post.location
        }
        
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE post SET ? WHERE id = ?;', [update, id]);

        if (result.affectedRows < 1) {
            return false;
        }
        return true;
    },




}

export default postsServices;