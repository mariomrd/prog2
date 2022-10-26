import { Request, Response } from 'express';

const generalController = {
  health: (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: `I'm healthy.`
    });
  },
};

export default generalController;