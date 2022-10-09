

interface INewComment {
    userId: number;
    postId: number;
    content: string;
}

interface IComment extends INewComment {
    id: number;
}

export {IComment, INewComment};