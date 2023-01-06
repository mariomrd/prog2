/* import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';


const postsServices = {
    getAllLikes: async () => {
        const [likes] = await pool.query(`SELECT * FROM liking`);
        console.log('getallPOSTSservices:', likes);
        return likes;
    },
    addLike: async () => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO post SET ?;', [like]);
        return result.insertId;
    },




      
}

export default postsServices; */