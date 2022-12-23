import { NextFunction, Request, Response } from "express";
//import { users } from "../../mockData";
import authServices from "../auth/authServices";
import { IUser, INewUser, IUserWithoutRole, INewUserSQL } from "./usersInterfaces";
import usersServices from "./usersServices";

const usersControllers = {

    //vaid admin näeb kõiki kasutajaid
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<any> =>  {
        const users = await usersServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users
            
        });
      },
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await usersServices.findUserById(id);
            console.log("getuserbyidcontroller:", user)
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

        //ümber teha
    /*deleteUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = usersServices.deleteUser(id);
        const {role} = req.body;
        if (role === "admin"){
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Kasutajat ei leitud'
                })
            }
            return res.status(201).json({
                success: true,
                message: `Kasutaja kustutatud`
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Kasutajaid saab vaid admin kustutada'
            })
        }
    },*/

    /*changeUserData: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email, password } = req.body;
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

        const userToChangeData: IUserWithoutRole = {
            id,
            firstName,
            lastName,
            email,
            password
        }

        usersServices.changeUserData(userToChangeData);



        return res.status(200).json({
            success: true,
            message: `Kasutaja andmed muudetud`,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
        
    }*/
}


export default usersControllers;