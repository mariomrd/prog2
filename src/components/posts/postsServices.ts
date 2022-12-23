import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import authServices from "../auth/authServices";
import { INewPost, INewPostSQL, IPost, IPostSQL } from "./postsInterfaces";



const postsServices = {
    findPostById: async (id: number) => {
        const [post]: [IPostSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM post WHERE id=?`, [id]);
        //console.log("findPOSTbyidservices:", post[0])
        return post[0];
    },
    getAllPosts: async () => {
        const [posts]: [IPostSQL[], FieldPacket[]] = await pool.query(`SELECT * FROM post`);
        //console.log('getallPOSTSservices:', posts);
        return posts;
    },
    /*deletePost: (id: number): Boolean => {
        const index = posts.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    },*/
    createPost: async (post: INewPostSQL): Promise<number> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO post SET ?;', [post]);
        return result.insertId;
      },




      
}

export default postsServices;