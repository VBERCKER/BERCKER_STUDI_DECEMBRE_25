import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connectionDb.js';
import Achat from '../models/achatmodels.js';
import utilisateurs from '../seeders/utilisateur.js';

/*** Définition du modèle utilisateur */

 const Utilisateur = sequelize.define('utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nom_utilisateur: {
    type: DataTypes.STRING(101),
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { 
      isEmail: true ,
    },
    
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
    /*validate: {
      is: /^[0-9a-f]+$/i, // Contrainte pour le pwd
    },*/
  },
  cles_utilisateur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'utilisateur',
  freezeTableName: true,
  timestamps: true 
});
Utilisateur.hasMany(Achat, { foreignKey: 'user_mail' , sourceKey: 'mail' });

console.log('Utilisateur === sequelize.models.Utilisateur:',Utilisateur === sequelize.models.utilisateur); // true


export default Utilisateur;