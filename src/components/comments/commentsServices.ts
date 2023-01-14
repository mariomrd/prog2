import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { IPostSQL } from "../posts/postsInterfaces";
//import { comments } from "../../mockData";
import { IComment, ICommentSQL } from "./commentsInterfaces";

const commentsServices = {
    //leiab kõik kommentaarid
    getAllComments: async (): Promise<ICommentSQL[]> => {
        const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
          `SELECT postId, userId, content FROM comment`
          );
        return comments;
      },
      //leiab ühe useri kõik kommentaarid
      getAllCommentsFromUser: async (): Promise<ICommentSQL[]> => {
        const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
          `SELECT postId, userId, content FROM comment
            INNER JOIN
              user ON comment.userId = userId`
          );
        return comments;
      },
      //kommentaari id järgi
    commentById: async (commentId: number) => {
      const [comment]: [ICommentSQL[], FieldPacket[]] = await pool.query(`SELECT commentId, postId, userId, content FROM comment WHERE commentId=?`, [commentId]);
      return comment[0];
  },
  createComment: async  (newComment: IComment): Promise<number> => {
    const comment: IComment = {
      ...newComment,
    };
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO comment SET ?;', [comment]);
    return result.insertId;
  },
  deleteComment: async (commentId: number): Promise<Boolean> => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE comment SET deletedDate = ? WHERE commentId = ?;', [new Date().toISOString().slice(0, 19).replace('T', ' '), commentId]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
    
    commentsByPostId: async (id: number) : Promise<ICommentSQL[]>=> {
      //leiab ühe postituse kõik kommentaarid
      const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
        `SELECT * FROM comment
          INNER JOIN
            post ON post.postId = comment.postId
         WHERE comment.postId=?`, [id]);
        return comments;
    },

}

export default commentsServices;