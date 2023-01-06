import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import authServices from "../auth/authServices";
import { IUserWithoutRole, IUserSQL } from "./usersInterfaces";




const usersServices = {
    findUserById: async (id: number) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, firstname, lastname, email, role FROM user WHERE id=? AND deleted_date IS NULL`, [id]);
        return user[0];
    },

    changeUserData: async (userToUpdate: IUserWithoutRole): Promise<Boolean> => {
        const {
          id, firstname, lastname, email, password
        } = userToUpdate;
        const user = await usersServices.findUserById(id);
    
        let hashedPassword = null;
        if (password) {
          hashedPassword = await authServices.hash(password);
        }
        const update = {
          firstname: firstname || user.firstName,
          lastname: lastname|| user.lastName,
          email: email || user.email,
          password: hashedPassword || user.password,
        };
    
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE user SET ? WHERE id=?;', [update, id]);
        if (result.affectedRows < 1) {
          return false;
        }
        return true;
      },
    getAllUsers: async () => {
        const [users]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT id, firstname, lastname, email, role FROM user;');
        return users;
    },
    deleteUser: async (id: number): Promise<Boolean> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE user SET deleted_date=? WHERE id=?;', [new Date(), id]);
        if (result.affectedRows < 1) {
            return false;
        }
        return true;
    },
    findUserByEmail: async (email: string) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, email, password, role FROM user WHERE email=?`, [email]);
        return user[0];
    }
}

export default usersServices;