import { router } from './router';

import * as groupMethods from './group-methods';

router.route('/group')
   .post(groupMethods.createGroup);

router.route('/groups')
   .get(groupMethods.getAllGroups);

router.route('/group/:id')
   .get(groupMethods.getGroupById)
   .put(groupMethods.updateGroupById)
   .delete(groupMethods.updateGroupById);
