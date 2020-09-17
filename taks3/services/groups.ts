import { Group } from '../types';
import { Groups } from '../models';

export class GroupsService {

    public static createGroup = async (dto: Group) => {
        try {
            await Groups.sync({ alter: true });
            const Group = Groups.build(dto);
            Group.save();
        } catch (e) {
            throw e;
        }
    };

    public static getGroupById = async (id: string) => {
        const GroupDAO = await Groups.findOne({ where: { id } });
        return GroupDAO;
    };

    public static updateGroupById = async (id: string, dto: Group) => {
        await Groups.update(
            {...dto},
            { where:  { id } }
        ).then(() => {
            console.log('Rows updated');
        });
    };

    public static deleteGroupbyId = async (id: string) => {
        await Groups.destroy(
            { where:  { id } }
        ).then((e) => {
            console.log('Rows updated', e);
        });
    };


    public static getAllGroups = async () => {
        const GroupDAO = await Groups.findAll();
        return GroupDAO;
    };
}