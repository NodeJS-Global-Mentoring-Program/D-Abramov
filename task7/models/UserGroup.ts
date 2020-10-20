import { DataType, Model } from 'sequelize-typescript';
import { sequelize } from '../data-access/db-connection';
import { Users } from './Users';
import { Groups } from './Groups';

export class UserGroup extends Model {}
UserGroup.init({
    userId: {
		type: DataType.STRING,
		allowNull: false
	  },
	groupId: {
		type: DataType.STRING,
		allowNull: false
	},
}, {
   sequelize,
   timestamps: true,
   modelName: 'UserGroup',
});

Users.belongsToMany(Groups, {
	onDelete: 'cascade',
	as: 'groups',
	through: 'UserGroup',
	foreignKey: 'userId',
});

Groups.belongsToMany(Users, {
	onDelete: 'cascade',
	as: 'users',
	through: 'UserGroup',
	foreignKey: 'groupId',
});