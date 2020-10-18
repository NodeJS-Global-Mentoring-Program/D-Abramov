import { NextFunction, Request, Response } from 'express';

export const routeParamsLogger = (req: Request, res: Response, next: NextFunction) => {
   const { method, url: service, body } = req;

   console.log({
      method,
      service,
      body
   });

   return next();
};
