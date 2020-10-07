import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://iixopqksyoyvfi:6692dd95d752931417b69ac140f68413eaa6cd45a125a94b88d62a4d3aa4f0dc@ec2-54-75-244-161.eu-west-1.compute.amazonaws.com:5432/dcu3b124qj84vs',
   {
      dialect: 'postgres',
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false
         }
      },
      logging: console.log
   });

export const withAuthenticate = (callback: () => void) => sequelize.authenticate()
   .then(() => {
      console.log('Connection has been established successfully.');
      callback();
   })
   .catch(err => {
      console.error('Unable to connect to the database:', err);
   });
