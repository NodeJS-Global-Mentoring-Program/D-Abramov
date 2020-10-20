import { NextFunction, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { GroupsService } from '../../services';

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const Groups = await GroupsService.getAllGroups();

      res.status(200).json(Groups);
   } catch (err) {
      return next(err);
   }
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const Group = await GroupsService.getGroupById(req.params.id);

      res.status(200).json(Group);
   } catch (err) {
      return next(err);
   }
};


export const updateGroupById = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { params: { id }, body } = req;

      await GroupsService.updateGroupById(id, body);

      res.status(200).json({
         status: 'success'
      });
   } catch (err) {
      return next(err);
   }
};


export const deleteGroupbyId = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { params: { id } } = req;

      await GroupsService.deleteGroupbyId(id);

      res.status(200).json({
         status: 'success'
      });
   } catch (err) {
      return next(err);
   }
};
