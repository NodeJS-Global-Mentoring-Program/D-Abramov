import { UserGroupService } from '../services';
import { router } from './router';

router.route('/user-group')
    .get(async (req, res) => {
        const UserGroup = await UserGroupService.getAllUserGroup();

        res.status(200).json(UserGroup);
    })
   .post(async (req, res) => {
      const { body } = req;

      await UserGroupService.associateUserToGroup({
         ...body
      });

      res.status(200).json({
         status: 'success',
      });
   })

router.route('/user-group/:id')
    .delete(async (req, res) => {
        const { params: { id } } = req;

        await UserGroupService.deletebyUserId(id);

        res.status(200).json({
        status: 'success'
        });
    });