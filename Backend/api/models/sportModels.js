// Définition du modèle sport
import { DataTypes } from 'sequelize'
import {sequelize} from '../config/connectionDb.js';
import Offre from './offreModels.js';
import sports from '../seeders/sport.js';

/*** Définition du modèle sport */
const Sport = sequelize.define('sport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  sport: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  sport_img: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'sport',
  freezeTableName: true,
  timestamps: true 
});
Sport.hasMany(Offre, { foreignKey: 'sport_id' , sourceKey: 'id' });

/*sequelize.sync({alter:true}).then(()=>{
  console.log('La table Sport a été synchronisée.');
 return  Sport.bulkCreate(sports)
}).catch((err)=>{console.log("sport syn:",err)});// Création de la table dans la base de données

*/
console.log('Sport === sequelize.models.Sport:',Sport === sequelize.models.sport); // true
export default Sport;