# BERCKER_STUDI_DECEMBRE_25
 
# Nom de l'application

JO34

## Description
Cette application permet de faire la reservation de tickets pour les jeux olympique 2024

## Fonctionnalités
- voir les offres
- Rserver des tickest 
- payer et obtenir son ticket
- modifier supprimer ajuter voir les offres (admin)

## Installation
1. Clonez ce dépôt distant.
2. ouvrir le dossier sur votre editeur de code.
3. Creer une base de donnée postgres (sequelize s'occupera de creer les tables et transmettre les donnes de bases) 
4. Instaler les variables d'envirenoment voir ##variable environement 
5. ouvrir le front chemin, avec la commande  cd /front 
6. Exécutez la commande `npm install` pour installer les dépendances.
7. Excuter la commande `npm run dev` pour demarer le front.
8. Pour demarer le Backend
9. ouvrir le fichier Backend avec la commande  cd /Backend/api
10. instaler les depensenses avec la commande `npm i `
11. Exécutez la commande `npm start` pour démarrer l'application.
12. suivre les readme du front et du back.
13. autroriser votre cors dans le backend a recevoir des requêtte de votre front (wishlist)

## Variable environment

1. creer un fichier .env dans la dossier api qui ce trouve dans Backend.
2. entrez vos variable d'environement sous les noms suivants :

SERVER_PORT = 
PG_HOST= 
PG_USER= 
PG_PASSWORD= 
PG_DATABASE= 
PG_PORT= 
DATABASE_ADMIN_URL = 
JWT_SECRET = 
STRIPE_KEY = 
COKIES_SECRET = 
STRIPE_ENDPOINTSECRET = 
SALT = 
API_FRONT = http://localhost:...
ADMIN_NOM= 
ADMIN_PRENOM= 
ADMIN_EMAIL= 
ADMIN_PASSWORD= 
ADMIN_ROLE= 
ADMIN_NOM_UTILISATEUR= 


## Site internet 

https://bercker-studi-decembre-25-slgc.vercel.app/

##Admin 
les informations et code admin sont dans la documentation à rendre copier coller les informations admin pour que cela fonctionne. 
