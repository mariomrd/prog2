import { NextFunction, Request, Response } from "express";
import { IUserWithoutRole } from "./usersInterfaces";
import usersServices from "./usersServices";

const usersControllers = {

    //vaid admin näeb kõiki kasutajaid
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let users;
            if (res.locals.user.role === 'admin') {
              users = await usersServices.getAllUsers();
            } else {
              const { id } = res.locals.user;
              users = usersServices.findUserById(id);
            }
      
            return res.status(200).json({
              success: true,
              message: 'List of users',
              users,
            });
          } catch (error) {
            next(error);
          }
    },
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await usersServices.findUserById(id);
            if (!user) throw new Error('User not found');
            return res.status(200).json({
                success: true,
                message: 'User',
                data: {
                    user
                }
            });
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await usersServices.findUserById(id);
            if (!user) throw new Error('Kasutajat ei leitud');
            const result = await usersServices.deleteUser(id);
            if (!result) throw new Error('Kustutamine ei õnnestunud');
            return res.status(200).json({
                success: true,
                message: 'Kasutaja kustutatud',
            });
        } catch (error) {
            next(error);
        }
    },

    changeUserData: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const {
                firstname, lastname, email, password,
            } = req.body;

            const user = await usersServices.findUserById(id);
            if (!user) throw new Error('Kasutajat ei leitud');
            if (!firstname && !lastname && !email && !password) throw new Error('Midagi pole muuta');

            const userToUpdate: IUserWithoutRole = {
                id,
                firstname,
                lastname,
                email,
                password,

            };

            const result = usersServices.changeUserData(userToUpdate);
            if (!result) throw new Error('Midagi läks valesti');
            return res.status(200).json({
                success: true,
                message: 'Kasutaja uuendatud',
            });
        } catch (error) {
            next(error);
        }
    },
}


export default usersControllers;