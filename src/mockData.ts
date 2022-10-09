import { IUser } from "./components/users/users_interfaces";
import { IPost } from "./components/posts/posts_interfaces";
import { IComment } from "./components/comments/comments_interfaces";

//hardcoded kasutajad
const users: IUser[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Root',
        email: 'jroot@tlu.ee',
        password: 'juhan123'
    },

    {
        id: 2,
        firstName: 'Matt',
        lastName: 'Straw',
        email: 'laststraw@tlu.ee',
        password: 'laststraw123'
    }
];

//hardcoded postitused
let posts: IPost[] = [
    {
        id: 1,
        title: 'minu kutsu',
        description: 'kutsu kirjeldus',
        picture: 'viide pildile',
        userId: 2,
        score: 5,
    },
    {
        id: 2,
        title: 'minu kiisu',
        description: 'kiisu kirjeldus',
        picture: 'viide pildile',
        userId: 1,
        score: 2,
    },
];

//kommentaarid

const comments: IComment[] = [
    {
        id: 1,
        userId: 1,
        postId: 1,
        content: 'lahe koer', 
    },
    {
        id: 2,
        userId: 2,
        postId: 2,
        content: 'nunnu kiisu', 
    },
    {
        id: 3,
        userId: 1,
        postId: 2,
        content: 'vahva kutsu', 
    },
]


export {users, comments, posts};
