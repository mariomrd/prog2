import e, { Request, Response } from "express";
import authServices from "./authServices";
import usersServices from "../users/usersServices";
import session from "express-session";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email või password on puudu',
        loggedIn: false
      });
    }
    const user = await usersServices.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kasutajat ei leitud',
        loggedIn: false
      });
    }
    const match = await authServices.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Vale parool',
        loggedIn: false
      });
    }
    
    const token = await authServices.sign(user);

    return res.status(200).json({
      user: user.email,
      success: true,
      message: `༼ つ ◕◡◕ ༽つ Have this Token of my gratitude, ${user.email}`,
      token,
      loggedIn: true
    });
  },
};

export default authController;