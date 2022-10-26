interface INewUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: 'false' | 'true';
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithoutPasswordAndRole {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: 'false';
}

interface IUserWithoutRole {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export { INewUser, IUser, IUserWithoutPassword, IUserWithoutPasswordAndRole, IUserWithoutRole};