import { uuid } from 'uuidv4';
import { GroupsService } from '../services';
import { router } from './router';

router.route('/group')
   .post(async (req, res) => {
      const { body } = req;
      // move to business logic
      const id = uuid();

      await GroupsService.createGroup({
         id,
         ...body
      });

      res.status(200).json({
         status: 'success',
         id,
      });
   });

router.route('/groups')
    .get(async (req, res) => {
        const Groups = await GroupsService.getAllGroups();

        res.status(200).json(Groups);
    })

router.route('/group/:id')
   .get(async (req, res) => {
      const Group = await GroupsService.getGroupById(req.params.id);

      res.status(200).json(Group);
   })
   .put(async (req, res) => {
      const { params: { id }, body } = req;

      await GroupsService.updateGroupById(id, body);

      res.status(200).json({
         status: 'success'
      });
   })
   .delete(async (req, res) => {
      const { params: { id } } = req;

      await GroupsService.deleteGroupbyId(id);

      res.status(200).json({
         status: 'success'
      });
   });