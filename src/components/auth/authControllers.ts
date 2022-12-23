import { Request, Response } from "express";
import authServices from "./authServices";
import usersServices from "../users/usersServices";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email või password on puudu',
      });
    }
    const user = await usersServices.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kasutajat ei leitud',
      });
    }
    const match = await authServices.compare(password, user.password);
    if (!match) {
      //console.log(password, user.password)
      return res.status(401).json({
        success: false,
        message: 'Vale parool',
      });
    }

    const token = await authServices.sign(user);

    return res.status(200).json({
      success: true,
      message: 'Token',
      token
    });
  },
};

export default authController;