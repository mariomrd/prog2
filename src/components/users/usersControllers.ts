import { Request, Response } from "express";
import { users } from "../../mockData";
import { IUser } from "./usersInterfaces";
import usersServices from "./usersServices";

const usersControllers = {
    
    //vaid admin saab näha
    getAllUsers: (req: Request, res: Response) => {
        const {isAdmin} = req.body;
        if (isAdmin === "true"){
            return res.status(200).json({
                success: true,
                message: 'Kasutajate nimekiri',
                users,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Ainult adminitele'
            })
        }
        
    },

    createUser: (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const id = users.length + 1;
        const newUser: IUser = {
            id,
            firstName,
            lastName,
            email,
            password,
            isAdmin: "false"
        };
        users.push(newUser);
        return res.status(201).json({
            success: true,
            message: `Kasutaja e-mailiga ${newUser.email} ja IDga ${newUser.id} loodud`
        });
    },

    findUserById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = users.find(element => {
            return element.id === id;
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kasutajat ei leitud'
            })
        }
        return res.status(201).json({
            success: true,
            message: `Kasutaja`,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    },

    deleteUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = usersServices.deleteUser(id);
        const {isAdmin} = req.body;
        if (isAdmin === "true"){
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
    },

    changeUserData: (req: Request, res: Response) => {
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

        const userToChangeData: IUser = {
            id,
            firstName,
            lastName,
            email,
            password,
            isAdmin: "false"
        }

        usersServices.changeUserData(userToChangeData);



        return res.status(200).json({
            success: true,
            message: `Kasutaja andmed muudetud`,
            /*data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }*/
        });
    }

}


export default usersControllers;