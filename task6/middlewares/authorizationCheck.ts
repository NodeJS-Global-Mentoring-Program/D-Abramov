import { NextFunction, Request, Response } from 'express';
import { JWT_KEY, nonAuthorizationCheckServices } from '../config';
import jwt from 'jsonwebtoken';

export const authorizationCheck = (req: Request, res: Response, next: NextFunction) => {
   const token: any = req.headers['x-access-token'];
   const { url } = req;

   if (nonAuthorizationCheckServices.some(service => url.includes(service))) {
      return next();
   }

   if (!token) {
      return res.status(401).json({
         status: 'fail',
         message: 'authorization failed'
      });
   }

   return jwt.verify(token, JWT_KEY, (err: any) => {
      if (err) {
         return res.status(401).json({
            status: 'fail',
            message: 'authorization denied'
         });
      }

      return next();
   });
};
