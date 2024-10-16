import { DataTypes} from 'sequelize'
import {sequelize} from '../config/connectionDb.js';
import Utilisateur from '../models/utilisateurModels.js';



/***definition du modelèe achat */

 const Achat = sequelize.define('achat',{
          id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            unique :true,
            },
            user_mail: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: { isEmail: true },
              references: {
               model: "utilisateur",
              key: 'mail'},
              
            },
          offre: {
            type: DataTypes.STRING(25),
            allowNull: false
            
          },
          sport: {
            type: DataTypes.STRING(25),
            allowNull: false
           
          },
          cles_achat: {
            type: DataTypes.STRING,
            allowNull: false,
            
            
          },
           heure_achat: {
            type: DataTypes.STRING,
            allowNull: false,
            
            
          }, 
          date: {
            type: DataTypes.STRING,
            allowNull: false,
            
            
          },
          cles_qr: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
},{
  sequelize,
  modelName: 'achat',
  freezeTableName: true,
  timestamps: true 
    
});



console.log('Achat === sequelize.models.achat', Achat === sequelize.models.achat); // true


export default Achat;
