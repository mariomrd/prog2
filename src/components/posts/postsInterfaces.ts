import { RowDataPacket } from "mysql2";


interface INewPost {
    userId: number;
    title: string;
    description: string;
    location: string;
}

interface IPost extends INewPost {
    id: number;
}

interface INewPostSQL {
    userId: number;
    title: string;
    description: string;
    location: string;
    creation_time?: string;
    deletedDate?: string
}

interface IPostSQL extends INewPostSQL, RowDataPacket {
    id: number;
}



export {INewPost, IPost, INewPostSQL, IPostSQL};