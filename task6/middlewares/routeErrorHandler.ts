import { NextFunction, Request, Response } from 'express';
import { Error } from 'sequelize/types';
import { CommonErrorHandleMiddlewareLogger } from '../helpers/Loggers';

export const routeErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   CommonErrorHandleMiddlewareLogger.error(err.stack);

   res.status(500).json({
      status: 'error'
   });

   next(err);
};
