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


export { INewUser, IUser, IUserWithPassword };