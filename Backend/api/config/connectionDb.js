import { Sequelize } from 'sequelize';
import env from 'dotenv';
import pg from 'pg';

env.config();

export const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  username: process.env.PG_USER, 
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  dialect: 'postgres', 
  dialectModule: pg,
  protocol: 'postgres',
});

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection sequelize ok !');
  } catch (error) {
    console.error('connection sequelize échoué:', error);
  }
};


db();