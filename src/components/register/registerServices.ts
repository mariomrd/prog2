import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import authServices from "../auth/authServices";
import { INewUser } from "../users/usersInterfaces";




const registerServices = {
    registerUser: async (user: INewUser): Promise<number> => {
        const hashedPassword = await authServices.hash(user.password);
        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: 'user'
        }
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO user SET ?;', newUser)
        console.log(result)
        return result.insertId;
    }




      
}

export default registerServices;