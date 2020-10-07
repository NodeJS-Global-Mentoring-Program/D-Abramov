import { NextFunction, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { GroupsService } from '../services';
import { router } from './router';

router.route('/group')
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { body } = req;
         // move to business logic
         const id = uuid();

         await GroupsService.createGroup({
            id,
            ...body
         });

         res.status(200).json({
            status: 'success',
            id
         });
      } catch (err) {
         return next(err);
      }
   });

router.route('/groups')
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const Groups = await GroupsService.getAllGroups();

         res.status(200).json(Groups);
      } catch (err) {
         return next(err);
      }
   });

router.route('/group/:id')
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const Group = await GroupsService.getGroupById(req.params.id);

         res.status(200).json(Group);
      } catch (err) {
         return next(err);
      }
   })
   .put(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { params: { id }, body } = req;

         await GroupsService.updateGroupById(id, body);

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

         await GroupsService.deleteGroupbyId(id);

         res.status(200).json({
            status: 'success'
         });
      } catch (err) {
         return next(err);
      }
   });
