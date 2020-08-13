import express from 'express';
import { uuid } from 'uuidv4';
import * as actions from './src/helpers';
import {
   store,
   validationMiddleware,
   userValidationSchema
} from './src';

const app = express();
const router = express.Router({ mergeParams : true });
const PORT = 3000;

app.use(express.json());
app.use('/api', router);

router.route('/user')
   .get((req, res) => {
      const { query: { search, limit } }: any = req;
      const users = actions.getAutoSuggestUsers(search, limit);

      res.status(200).json({
         status: 'success',
         users: JSON.stringify(users)
      });
   })
   .post(validationMiddleware(userValidationSchema), (req, res) => {
      const { body } = req;

      actions.createUser({
         id: uuid(),
         isDeleted: false,
         ...body
      });

      console.log(store);

      res.status(200).json({
         status: 'success'
      });
   });

router.route('/user/:id')
   .get((req, res) => {
      const user = actions.getUserbyId(req.params.id);

      res.status(200).json(user);
   })
   .put(validationMiddleware(userValidationSchema), (req, res) => {
      const { params: { id }, body } = req;

      actions.updateUserById(id, {
         ...body
      });

      console.log(store);

      res.status(200).json({
         status: 'success'
      });
   })
   .delete((req, res, next) => {
      const { params: { id } } = req;

      actions.deleteUserbyId(id);

      console.log(store);

      res.status(200).json({
         status: 'success'
      });
   });

app.listen(PORT, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
