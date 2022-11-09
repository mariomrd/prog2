import { Request, Response } from 'express';

const generalController = {
  index: (req: Request, res: Response) => {
    res.send('<h1>yoyo</h1>')
  },
  
  health: (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: `I'm healthy.`
    });
  },
  default: (req: Request, res: Response) => {
    res.status(404).send('<h1>This path does not exist</h1>')
  }
};

export default generalController;