import { comments } from "../../mockData";
import { IComment } from "./commentsInterfaces";

const commentsServices = {

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

