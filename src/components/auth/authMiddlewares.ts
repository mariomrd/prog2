import { Request, Response, NextFunction } from 'express';
import authServices from './authServices';

const authMiddleware = {
  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not found',
      });
    }
    try {
      const decoded = await authServices.verify(token);
      res.locals.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }
    return next();
  }
};

export default authMiddleware;