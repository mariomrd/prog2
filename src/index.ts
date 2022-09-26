import express, {Request, Response} from 'express'; 
import { createModuleResolutionCache } from 'typescript';
const app = express();
const PORT = 3000;

app.use(express.json());

// * TEST *

app.get('/api/v1/health', (req: Request, res: Response) => {
    return res.status(200).json({
        message :'Henlo'
    });
});

interface INewUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithPassword extends IUser {
    password: string;
}

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

interface INewComment {
    userId: number;
    postId: number;
    content: string;
}

interface IComment extends INewComment {
    id: number;
}




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


// * KASUTAJA *

//kasutajate nimekiri
app.get('/api/v1/users', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'Kasutajate nimekiri',
        users,
    });
});

//kasutaja loomine
app.post('/api/v1/users', (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
           success: false,
           message: 'Mingid andmed on puudu'
       });
    }
    const id = users.length + 1;
    const newUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
    };
    users.push(newUser);
    return res.status(201).json({
        success: true,
        message: `Kasutaja e-mailiga ${newUser.email} ja IDga ${newUser.id} loodud`
    });
});

//kasutaja otsimine ID alusel
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
         return res.status(404).json({
            success: false,
            message: 'Kasutajat ei leitud'
        })
    }
    return res.status(201).json({
        success: true,
        message: `Kasutaja`,
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
});


//kasutaja kustutamine
app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
         return res.status(404).json({
            success: false,
            message: 'Kasutajat ei leitud'
        })
    }
    users.splice(index, 1);
     return res.status(201).json({
        success: true,
        message: `Kasutaja kustutatud`
    });
});

//kasutaja andmete muutmine
app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {firstName, lastName, email, password} = req.body;
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
         return res.status(404).json({
            success: false,
            message: 'Kasutajat ei leitud'
        })
    }
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({
           success: false,
           message: 'Midagi pole muuta'
       })
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
   


    return res.status(201).json({
        success: true,
        message: `Kasutaja andmed muudetud`,
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
});

// * POSTITUSTE meeldivaks märkimine *

// praegu saab mitu korda meeldivaks märkida, mida saaks küll frontiga, aga tõenäoliselt tuleks siin lahendada

//postituse otsimine ID alusel ning score++
app.post('/api/v1/posts/:id/like', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = posts.find(element => {
        return element.id === id;
    });
    if (!post) {
         return res.status(404).json({
            success: false,
            message: 'Postitatud pilti ei leitud'
        })
    }
    let user: IUser | undefined = users.find(element => element.id === post.userId);
    if (!user) {
        user = {
            id: 0,
            firstName: 'User missing',
            lastName: 'User missing',
            email: 'User missing',
            password: 'User missing'
        }
    }
    post.score = post.score + 1
    const postWithUserName = {
        id: post.id,
        title: post.title,
        description: post.description,
        picture: post.picture,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        score: post.score,
    }
    return res.status(201).json({
        success: true,
        message: `Postitus IDga ${id} on leitud ning score++`,
        data: {
            post: postWithUserName
        }
    });
});

//postituse otsimine ID alusel ning mitte meeldivaks märkimine
app.post('/api/v1/posts/:id/dislike', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = posts.find(element => {
        return element.id === id;
    });
    if (!post) {
         return res.status(404).json({
            success: false,
            message: 'Postitatud pilti ei leitud'
        })
    }
    let user: IUser | undefined = users.find(element => element.id === post.userId);
    if (!user) {
        user = {
            id: 0,
            firstName: 'User missing',
            lastName: 'User missing',
            email: 'User missing',
            password: 'User missing'
        }
    }
    const postWithUserName = {
        id: post.id,
        title: post.title,
        description: post.description,
        picture: post.picture,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        score: post.score - 1
    }
    return res.status(201).json({
        success: true,
        message: `Postitus IDga ${id} on leitud ning score++`,
        data: {
            post: postWithUserName
        }
    });
});

// * POSTITUS *

//postituste nimekiri
app.get('/api/v1/posts', (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: 'postituste nimekiri',
        posts
    });
});

//postituse otsimine ID alusel
app.get('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = posts.find(element => {
        return element.id === id;
    });
    if (!post) {
         return res.status(404).json({
            success: false,
            message: 'Postitatud pilti ei leitud'
        })
    }
    let user: IUser | undefined = users.find(element => element.id === post.userId);
    if (!user) {
        user = {
            id: 0,
            firstName: 'User missing',
            lastName: 'User missing',
            email: 'User missing',
            password: 'User missing'
        }
    }
    const postWithUserName = {
        id: post.id,
        title: post.title,
        description: post.description,
        picture: post.picture,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        score: post.score,
    }
    return res.status(201).json({
        success: true,
        message: `Postitus IDga ${id} on leitud`,
        data: {
            post: postWithUserName
        }
    });
});

//postituse loomine
app.post('/api/v1/posts', (req: Request, res: Response) => {
    const {title, description, picture, userId, score} = req.body;
    if (!title || !picture || !userId) {
        return res.status(400).json({
           success: false,
           message: 'Pead lisama pildi koos pealkirjaga'
       });
    }

    const id = posts.length + 1;
    const newPost: IPost = {
        id,
        title,
        userId,
        description,
        picture,
        score,
    };
    posts.push(newPost);
    return res.status(201).json({
        success: true,
        message: `Postitus pealkirjaga '${newPost.title}' ja IDga ${newPost.id} on loodud.`
    });
});

//postituse kustutamine
app.delete('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(element => element.id === id);
    if (index === -1) {
         return res.status(404).json({
            success: false,
            message: 'Postitust ei leitud'
        })
    }
    posts.splice(index, 1);
     return res.status(201).json({
        success: true,
        message: `Postitus kustutatud`
    });
});

//postituse muutmine
app.patch('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {title, description, picture} = req.body;
    const post = posts.find(element => {
        return element.id === id;
    });
    if (!post) {
         return res.status(404).json({
            success: false,
            message: 'Postitust ei leitud'
        })
    }
    if (!title && !description && !picture) {
        return res.status(400).json({
           success: false,
           message: 'Midagi pole muuta'
       })
    }
    if (title) post.title = title;
    if (description) post.description = description;
    if (picture) post.picture = picture;
   


    return res.status(201).json({
        success: true,
        message: `postitus muudetud`,
        data: {
            id: post.id,
            title: post.title,
            description: post.description,
            picture: post.picture,
        }
    });
});

// * KOMMENTAARID *

// kõikide kommentaaride pärimine
app.get('/api/v1/comments', (req: Request, res: Response) => {
    const commentsWithUsers = comments.map(comment => {
        let user: IUserWithPassword | undefined = userById(comment.id);
        if (!user) user = user = {
            id: 0,
            firstName: 'User missing',
            lastName: 'User missing',
            email: 'User missing',
            password: 'User missing'
        };
        const commentWithUser = {
            id: comment.id,
            content: comment.content,
            user: {
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
        return commentWithUser;
    });

    res.status(200).json({
        success: true,
        message: 'Kõik kommentaarid',
        comments: commentsWithUsers,
    });
});

// Kommentaar id alusel
app.get('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = commentById(id);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: `Kommentaari ei leitud`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Kommentaar IDga ${id} leitud`,
        data: {
            comment,
        },
    });
});

// Postitusega seotud kommentaaride pärimine
app.get('/api/v1/posts/:id/comments', (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const comments = commentsByPostId(postId);
    const post = posts.find(element => {
        return element.id === postId;
    });
    if (!post) {
        return res.status(400).json({
            success: false,
            message: `Sellist postitust pole olemas`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Postitusega ${postId} seotud kommentaarid`,
        data: {
            comments,
        },
    });
});

// kommentaari loomine
app.post('/api/v1/comments', (req: Request, res: Response) => {
    const { postId, content } = req.body;
    let { userId } = req.body;
    if (!postId || !content) {
        return res.status(400).json({
            success: false,
            message: `Mingid andmed on puudu`,
        });
    }
    if (!userId) userId = null;
    const id = comments.length + 1;
    const comment: IComment = {
        id,
        userId,
        postId,
        content,
    };
    comments.push(comment);

    return res.status(201).json({
        success: true,
        message: `Kommentaar IDga ${comment.id} loodud`,
    });
});

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Kommentaari ei leitud`,
        });
    }
    comments.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Kommentaar kustutatud`,
    });
});


// funktsioonid otsimiseks

const commentById = (id: number) : IComment | undefined => {
    const comment = comments.find(element => {
        return element.id === id;
    });
    return comment;
};

const commentsByPostId = (id: number): IComment[] => {
    const postComments = comments.filter(comment => comment.postId === id);
    return postComments;
};

const userById = (id: number): IUserWithPassword | undefined => {
    const user = users.find(element => {
        element.id = id;
    });
    return user;
};

// * PORT *

app.listen(PORT, () => {
    console.log('Server is running');
})