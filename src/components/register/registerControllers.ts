import { NextFunction, Request, Response } from "express";
//import { users } from "../../mockData";
import authServices from "../auth/authServices";
import { IUser, INewUser, IUserWithoutRole, INewUserSQL } from "../users/usersInterfaces";
import registerServices from "./registerServices";

const registerControllers = {

    registerUser: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const newUser: INewUser = {
            firstName,
            lastName,
            email,
            password,
            role: 'user'
        };
        const id = await registerServices.registerUser(newUser);
        return res.status(201).json({
            success: true,
            message: `Kasutaja e-mailiga ${newUser.email} ja IDga ${id} loodud`
        });
    },

}
export default registerControllers;