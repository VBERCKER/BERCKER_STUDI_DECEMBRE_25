import { Sequelize } from 'sequelize';
import env from 'dotenv';

env.config();

import {Utilisateur, Sport, Offre, Achat} from '../api/models/index.js';

const sequelize = new Sequelize(process.env.DATABASE_ADMIN_URL,{dialect: 'postgres'});

async function init() {
  try {
    await sequelize.authenticate();
    console.log('Connection sequelize ok !');
    await sequelize.sync();
    console.log('La bases de données est à été créee avec succès');
  } catch (error) {
    console.error('Erreur lors de la connexion ou de la synchronisation de la base de données:', error);
  }
}
init();