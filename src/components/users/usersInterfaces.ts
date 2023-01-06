import { RowDataPacket } from 'mysql2';

interface INewUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

interface IUser extends INewUser {
    id: number;
}

interface INewUserSQL{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

interface IUserSQL extends INewUserSQL, RowDataPacket {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
}

interface IUserWithoutRole {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}


export { INewUser, IUser, IUserWithoutPassword, IUserWithoutRole, INewUserSQL, IUserSQL};