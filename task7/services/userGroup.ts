import { UserGroup as IUserGroup } from '../types';
import { UserGroup, Users, Groups } from '../models';
import { ErrorCatchDecorator } from '../helpers';

@ErrorCatchDecorator
export class UserGroupService {
    public static associateUserToGroup = async ({ UserId, GroupId }: IUserGroup) => {
       await UserGroup.sync({ alter: true });

       Users.findOne({ where: { id: UserId } }).then((user: any) => {
          if (!user) {
             console.log('user not found');
             return null;
          }

          return Groups.findOne({ where: { id: GroupId } }).then((group) => {
             if (!group) {
                console.log('group not found');
                return null;
             }

             user.addGroups(group);

             return user;
          });
       });
    };

    public static deletebyUserId = async (UserId: string) => {
       await UserGroup.destroy(
          { where:  { UserId } }
       ).then((e) => {
          console.log('Rows updated', e);
       });
    };

    public static getAllUserGroup = async () => {
       const GroupDAO = await UserGroup.findAll();
       return GroupDAO;
    };
}
