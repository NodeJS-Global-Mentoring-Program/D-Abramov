import { User } from '../types';
import { Users } from '../models';
import { sequelize } from '../data-access/db-connection';
import { USER_LIST } from '../store';
import { Sequelize } from 'sequelize';
import { ErrorCatchDecorator } from '../helpers';

@ErrorCatchDecorator
export class UserService {
    public static getAutoSuggestUsers = async (
       { search, limit }: {search: any, limit: any}
    ) => {
       const usersDAO = await Users.findAll(
          {
             limit,
             where: {
                login: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('login')), 'LIKE', `%${  search.toLowerCase()  }%`)
             }
          }
       );

       return usersDAO;
    };

    public static createUser = async (dto: User) => {
       const user = Users.build(dto);
       user.save();
    };

    public static getUserById = async (id: string) => {
       const userDAO = await Users.findOne({ where: { id } });
       return userDAO;
    };

    public static getUserByLogin = async (login: string) => {
       const userDAO = await Users.findOne({ where: { login } });
       return userDAO;
    };

    public static updateUserById = async (id: string, dto: User) => {
       await Users.update(
          { ...dto },
          { where:  { id } }
       ).then(() => {
          console.log('Rows updated');
       });
    };

    public static deleteUserbyId = async (id: string) => {
       await Users.update(
          { isDeleted: true },
          { where:  { id } }
       ).then(() => {
          console.log('Rows updated');
       });
    };

    public static seedUsers = async () => {
       await Users.sync({ alter: true });

       await sequelize.transaction(async () => {
          return Promise.all(USER_LIST.map(user => Users.build(user)))
             .then(result => result.forEach(user => user.save()));
       });
    }
}
