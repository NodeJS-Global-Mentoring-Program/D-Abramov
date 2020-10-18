import { NextFunction, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import {
   validationMiddleware,
   userValidationSchema
} from '../middlewares';
import { UserService } from '../services';
import { router } from './router';

router.route('/user')
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { query: { search, limit } } = req;
         const users = await UserService.getAutoSuggestUsers({ search, limit });

         res.status(200).json({
            status: 'success',
            users: JSON.stringify(users)
         });
      } catch (err) {
         return next(err);
      }
   })
   .post(validationMiddleware(userValidationSchema), async (
      req: Request, res: Response, next: NextFunction
   ) => {
      try {
         const { body } = req;

         await UserService.createUser({
            id: uuid(),
            isDeleted: false,
            ...body
         });

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   });

router.route('/user/:id')
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await UserService.getUserById(req.params.id);
         res.status(200).json(user);
      } catch (err) {
         return next(err);
      }
   })
   .put(validationMiddleware(userValidationSchema), async (
      req: Request, res: Response, next: NextFunction
   ) => {
      try {
         const { params: { id }, body } = req;

         await UserService.updateUserById(id, body);

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   })
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { params: { id } } = req;

         await UserService.deleteUserbyId(id);

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   });
