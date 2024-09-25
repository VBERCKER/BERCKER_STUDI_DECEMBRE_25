
Backend de l'application Billetterie en ligne

Ce dossier contient le code source du backend de notre application de billetterie en ligne. Il est construit avec Node.js et Express.

## Installation

Pour installer et exécuter ce projet sur votre machine locale, suivez les étapes suivantes :

1. Clonez ce dépôt sur votre machine locale : `git clone https://github.com/VBERCKER/JO24.git`
2. Assurez-vous d'avoir Node.js installé. 
3. Naviguez vers le dossier backend : `cd backend`
4. Exécutez la commande `npm install` pour installer les dépendances.

## Configuration

Avant de pouvoir exécuter le backend, vous devez configurer certaines variables d'environnement. Créez un fichier `.env` à la racine du dossier backend et ajoutez les variables suivantes :

DB_HOST= Votre hôte de base de données
DB_USER= Votre utilisateur de base de données
DB_PASS= Votre mot de passe de base de données
DB_DATABASE= Le nom de votre base de données
Remplacez par vos informations de connexion à la base de données.

Il faut egalement : 
SERVER_PORT = Le port de votre serveur. 
STRIPE_KEY = la cles de l'API stripe.
COKIES_SECRET = une cles en string pour les cookies.
STRIPE_ENDPOINTSECRET = La cles du stripe webhooks


SALT = nombre de tours pour crypter les mots de passes. 

API_FRONT = Le domaine de votre URL front. 
GOOGLE_PROFILE = Le 'URL de api google pour recupérer le profile utilisateur. 

 ## base de données 

 Pour faire fonctioner l'application, vous avez besoin d'une base de données. Vous trouverez les models dans le dosier models. une fois les variables d'environement configués, vous pourrez exceuter sequalize pour contruire la base de donnée automatiquement.  

## Exécution

Pour exécuter le serveur, utilisez la commande : npm start

## Tests
Ce projet utilise Jest pour les tests unitaires. Pour exécuter les tests, utilisez la commande : npm test

## Contribution
Les contributions à ce projet sont les bienvenues. Si vous souhaitez contribuer, veuillez d'abord discuter des modifications que vous souhaitez apporter via une issue.

