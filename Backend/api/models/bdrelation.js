import Offre from './offreModels.js';
import Sport from './sportModels.js';
import Achat from './achatmodels.js';
import Utilisateur from './utilisateurModels.js';


Utilisateur.hasMany(Achat, { foreignKey: 'user_mail', sourceKey: 'mail' });
Achat.belongsTo(Utilisateur, { foreignKey: 'user_mail', targetKey: 'mail' });

Sport.hasMany(Offre, { foreignKey: 'sport_id', sourceKey: 'id' });
Offre.belongsTo(Sport, { foreignKey: 'sport_id', targetKey: 'id' });

export  { Offre, Sport, Utilisateur, Achat };