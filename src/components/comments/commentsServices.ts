import { FieldPacket } from "mysql2";
import pool from "../../database";
import { comments } from "../../mockData";
import { IComment, ICommentSQL } from "./commentsInterfaces";

const commentsServices = {
    getAllComments: async (): Promise<ICommentSQL[]> => {
        const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
          `SELECT ID, PostID, UserID, Content FROM comment
            INNER JOIN
              user ON comment.userID = user.id`
          );
        return comments;
      },
    commentById: (id: number) : IComment | undefined => {
        const comment = comments.find(element => {
            return element.id === id;
        });
        return comment;
    },
    
    commentsByPostId: (id: number): IComment[] => {
        const postComments = comments.filter(comment => comment.postId === id);
        return postComments;
    }

}

export default commentsServices;

