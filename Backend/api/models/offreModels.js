import { DataTypes } from 'sequelize'
import {sequelize} from '../config/connectionDb.js';
import offres from '../seeders/offre.js';



/***definition du modelèe des offres */
 const Offre = sequelize.define('offre',{

           id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                unique :true,
                },

          offre: {
            type: DataTypes.STRING(25),
            allowNull: false
            
          },
          place_offre: {
            type: DataTypes.INTEGER,
            allowNull: false
           
          },
          prix_offre: {
            type: DataTypes.INTEGER,
            allowNull: false
            
          }, 
           places_dispo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
            
          }, 
          sport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "sport",
              key: 'id'
            },
          
            
          }
},{
  sequelize,
  modelName: 'offre',
  freezeTableName: true,
  timestamps: true 
    
});


console.log('Offre === sequelize.models.offre', Offre === sequelize.models.offre)

export default Offre;
