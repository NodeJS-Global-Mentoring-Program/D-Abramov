import {
   validationMiddleware,
   userValidationSchema
} from '../middlewares';
import { router } from './router';
import * as userMethods from './user-methods';

router.route('/user')
   .get(userMethods.getAutoSuggestUser)
   .post(validationMiddleware(userValidationSchema), userMethods.createUser);

router.route('/user/:id')
   .get(userMethods.getUserById)
   .put(validationMiddleware(userValidationSchema), userMethods.updateUser)
   .delete(userMethods.deleteUser);
