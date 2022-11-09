import { Request, Response, NextFunction } from 'express';
import authServices from './authServices';

const authMiddleware = {
  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; //sest sõna Bearer ja tühik
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not found'
      });
    }

    //kui ei ole try catch, siis crashib vale tokeni puhul
    try {
      const decoded = await authServices.verify(token);
      res.locals.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token not valid'
      });
    }
    return next();
  },
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.isAdmin === 'false') {
      return res.status(401).json({
        success: false,
        message: 'You are not an admin'
      });
    }
    return next();
  }
}

export default authMiddleware;