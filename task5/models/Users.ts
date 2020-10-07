import { DataType, Model } from 'sequelize-typescript';
import { sequelize } from '../data-access/db-connection';

export class Users extends Model {}
Users.init({
   id: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
   },
   login: {
      type: DataType.STRING,
      allowNull: false,
   },
   password: {
      type: DataType.STRING,
      allowNull: false,
   },
   age: {
      type: DataType.INTEGER,
      allowNull: false,
   },
   isDeleted: {
      type: DataType.BOOLEAN,
      allowNull: false,
   },
}, {
   sequelize,
   timestamps: true,
   modelName: 'Users'
});