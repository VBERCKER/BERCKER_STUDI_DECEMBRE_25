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
            type: DataTypes.INTEGER(10),
            allowNull: false
           
          },
          prix_offre: {
            type: DataTypes.INTEGER(10),
            allowNull: false
            
          }, 
           places_dispo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
            
          }, 
          sport_id: {
            type: DataTypes.INTEGER(10),
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

/*sequelize.sync({alter:true, force:true}).then(()=>{
  return Offre.bulkCreate(offres)
}).catch((err)=>{console.log("offre sync",err)});// Création d*/

console.log('Offre === sequelize.models.offre', Offre === sequelize.models.offre)

export default Offre;
