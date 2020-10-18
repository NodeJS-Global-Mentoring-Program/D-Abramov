import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services';
import { router } from './router';
import { JWT_KEY } from '../config';
import jwt from 'jsonwebtoken';

import { compareUserCredentials } from '../helpers';

router.route('/login')
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { body: { login, password } } = req;

         const user: any = await UserService.getUserByLogin(login);

         if (user && compareUserCredentials(user, { login, password })) {
            const payload = { id: user.id, login: user.login };
            const token = jwt.sign(payload, JWT_KEY, { expiresIn: 120 });
            res.status(200).send(token);
         } else {
            res.status(401).json({
               status: 'fail',
               message: 'Bad username/password combination'
            });
         }
      } catch (err) {
         return next(err);
      }
   });
