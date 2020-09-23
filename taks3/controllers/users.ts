import { uuid } from 'uuidv4';
import { 
    validationMiddleware,
    userValidationSchema,
} from '../middlewares';
import { UserService } from '../services';
import { router } from './router';

router.route('/user')
   .get((req, res) => {
      const { query: { search, limit } } = req;
      const users = UserService.getAutoSuggestUsers({search, limit});

      res.status(200).json({
         status: 'success',
         users: JSON.stringify(users)
      });
   })
   .post(validationMiddleware(userValidationSchema), async (req, res) => {
      const { body } = req;

      await UserService.createUser({
         id: uuid(),
         isDeleted: false,
         ...body
      });

      res.status(200).json({
         status: 'success'
      });
   });

router.route('/user/:id')
   .get(async (req, res) => {
      const user = await UserService.getUserById(req.params.id);

      res.status(200).json(user);
   })
   .put(validationMiddleware(userValidationSchema), async (req, res) => {
      const { params: { id }, body } = req;

      await UserService.updateUserById(id, body);

      res.status(200).json({
         status: 'success'
      });
   })
   .delete(async (req, res) => {
      const { params: { id } } = req;

      await UserService.deleteUserbyId(id);

      res.status(200).json({
         status: 'success'
      });
   });