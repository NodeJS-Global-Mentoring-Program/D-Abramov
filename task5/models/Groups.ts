import { DataType, Model } from 'sequelize-typescript';
import { sequelize } from '../data-access/db-connection';

export class Groups extends Model {}
Groups.init({
   id: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
   },
   name: {
      type: DataType.STRING,
      allowNull: false,
   },
   permissions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: false,
   },
}, {
   sequelize,
   timestamps: true,
   modelName: 'Groups'
});