import { RowDataPacket } from 'mysql2';

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

interface INewUserSQL{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: 'false' | 'true';
}

interface IUserSQL extends INewUserSQL, RowDataPacket {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: 'false' | 'true';
}

interface IUserWithoutRole {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export { INewUser, IUser, IUserWithoutPassword, IUserWithoutRole, INewUserSQL, IUserSQL};