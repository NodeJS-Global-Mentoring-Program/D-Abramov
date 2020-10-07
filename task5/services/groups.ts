import { Group } from '../types';
import { Groups } from '../models';
import { ErrorCatchDecorator } from '../helpers';

@ErrorCatchDecorator
export class GroupsService {
    public static createGroup = async (dto: Group) => {
       await Groups.sync({ alter: true });
       const newGroup = Groups.build(dto);
       newGroup.save();
    };

    public static getGroupById = async (id: string) => {
       const GroupDAO = await Groups.findOne({ where: { id } });
       return GroupDAO;
    };

    public static updateGroupById = async (id: string, dto: Group) => {
       await Groups.update(
          { ...dto },
          { where:  { id } }
       ).then(() => {
          console.log('Rows updated');
       });
    };

    public static deleteGroupbyId = async (id: string) => {
       await Groups.destroy(
          {
             where:  { id },
             cascade: true
          }
       ).then((e) => {
          console.log('Rows updated', e);
       });
    };


    public static getAllGroups = async () => {
       const GroupDAO = await Groups.findAll();
       return GroupDAO;
    };
}
