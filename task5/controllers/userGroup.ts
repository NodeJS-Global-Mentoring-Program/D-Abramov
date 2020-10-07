import { NextFunction, Request, Response } from 'express';
import { UserGroupService } from '../services';
import { router } from './router';

router.route('/user-group')
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const UserGroup = await UserGroupService.getAllUserGroup();
         res.status(200).json(UserGroup);
      } catch (err) {
         return next(err);
      }
   })
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { body } = req;

         await UserGroupService.associateUserToGroup({
            ...body
         });

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   });

router.route('/user-group/:id')
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { params: { id } } = req;

         await UserGroupService.deletebyUserId(id);

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   });
