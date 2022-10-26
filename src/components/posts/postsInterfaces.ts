

interface INewPost {
    userId: number;
    title: string;
    description: string;
    picture: string;
    score: number;
}

interface IPost extends INewPost {
    id: number;
}


export {INewPost, IPost};