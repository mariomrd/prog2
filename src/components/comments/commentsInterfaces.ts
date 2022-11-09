import { RowDataPacket } from "mysql2";

interface INewComment {
    userId: number;
    postId: number;
    content: string;
}

interface IComment extends INewComment {
    id: number;
}
interface INewCommentSQL {
    userId: number;
    postId: number;
    content: string;
}

interface ICommentSQL extends INewCommentSQL, RowDataPacket {
    id: number;
}

export {IComment, INewComment, ICommentSQL, INewCommentSQL};