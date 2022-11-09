import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { users } from "../../mockData";
import authServices from "../auth/authServices";
import { INewUser, IUser, IUserWithoutRole, INewUserSQL, IUserSQL } from "./usersInterfaces";



const usersServices = {
    finduserById: async (id: number) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT ID, Firstname, Lastname, Email FROM User WHERE id=?`, [id]);
        return user[0];
    },

    changeUserData: async (userToChangeData: IUserWithoutRole ) => {
        const {id, firstName, lastName, email, password} = userToChangeData;
        const user = await usersServices.finduserById(id);
        if (user && firstName) user.firstName = firstName;
        if (user && lastName) user.lastName = lastName;
        if (user && email) user.email = email;
        if (user && password) user.password = password;

        return true;
    },
    getAllUsers: async () => {
        const [users] = await pool.query('SELECT ID, Firstname, Lastname, Email FROM User;');
        //console.log('users:', users);
        return users;
    },
    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    },
    findUserByEmail: async (email: string) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT ID, Firstname, Lastname, Email FROM User WHERE email=?`, [email]);
        return user[0];
      },
    createUser: async (user: INewUser): Promise<number> => {
        const hashedPassword = await authServices.hash(user.password);
        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            isAdmin: 'false'
        }
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO user SET ?;', newUser)
        console.log(result)
        return result.insertId;
    }




      
}

export default usersServices;