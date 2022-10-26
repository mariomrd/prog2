import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
    checkCreateUserData: (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Osa nõutavatest väljadest on puudu (firstName, lastName, email, password)`,
            });
        };
        if (!(email.includes("@") && email.includes("."))){
            return res.status(400).json({
                success: false,
                message: `Palun sisesta korrektne e-mail aadress`,
            });
        }
        function containsNumber(str: string) {
            return /[0-9]/.test(str);
          }

        if (containsNumber(firstName) || containsNumber(lastName))  {
            return res.status(400).json({
                success: false,
                message: `Eesnimi ega perenimi ei tohi sisaldada numbrit. Sorry.`
            })
        }

        next();
    }

};

export default usersMiddlewares;