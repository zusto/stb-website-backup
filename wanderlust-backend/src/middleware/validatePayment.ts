import { Request, Response, NextFunction } from 'express';

export const validatePaymentData = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.amount) {
    res.status(400).json({ error: 'Amount is required' });
    return;
  }
  next();
};