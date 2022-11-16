import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

export const loginLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()} E-mail: ${req.body?.email || null}`);
  next();
};

export const userLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()} User id: ${res.locals.user?.id || null}`);
  next();
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Something broke!',
  });
};