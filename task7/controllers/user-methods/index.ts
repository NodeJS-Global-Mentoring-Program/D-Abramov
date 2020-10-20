import { NextFunction, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { UserService } from '../../services';

export const getAutoSuggestUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { query: { search, limit } } = req;
      const users = await UserService.getAutoSuggestUsers({ search, limit });

      res.status(200).json({
         status: 'success',
         users
      });
   } catch (err) {
      return next(err);
   }
};

export const createUser = async (
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
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
   } catch (err) {
      return next(err);
   }
};

export const updateUser = async (
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
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { params: { id } } = req;

      await UserService.deleteUserbyId(id);

      res.status(200).json({
         status: 'success'
      });
   } catch (err) {
      return next(err);
   }
};

