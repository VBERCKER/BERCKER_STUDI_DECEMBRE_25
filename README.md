# BERCKER_STUDI_DECEMBRE_25
 
# Nom de l'application

JO24

## Description
Cette application permet de faire la reservation de tickets pour les jeux olympique 2024

## Fonctionnalités
- voir les offres
- Rserver des tickest 
- payer et obtenir son ticket
- modifier supprimer ajuter voir les offres (admin)

## technologie 
- Node JS
- REACT JS
- VITE
  
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
14. Aller sur Stripe pour pour générer votre clés client Stripe

## Variable environment

1. creer un fichier .env dans la dossier api qui ce trouve dans Backend.
2. entrez vos variable d'environement sous les noms suivants :

SERVER_PORT = Le port de votre serveurs 
PG_HOST= le host de votre base de donnée postgres 
PG_USER= le username de votre base de donnée postgres 
PG_PASSWORD= le passeword de votre base de donnée postgres 
PG_DATABASE= le nom de votre basse de donnée postgres
PG_PORT=  le port de votre basse de donnée postgres 
DATABASE_ADMIN_URL = URL de votre basse de donnée postgres
JWT_SECRET = votre cles secret token 
STRIPE_KEY = votre cles stripe 
COKIES_SECRET = vote cles secrete 
STRIPE_ENDPOINTSECRET = votre stripe ENDPOINT 
SALT = le nombre de tour pout saller les mots de passes
API_FRONT = URL de votre api front 
ADMIN_NOM= voir les informatiosn dans la documentations 
ADMIN_PRENOM= voir les informatiosn dans la documentations 
ADMIN_EMAIL= voir les informatiosn dans la documentations 
ADMIN_PASSWORD= voir les informatiosn dans la documentations 
ADMIN_ROLE= voir les informatiosn dans la documentations 
ADMIN_NOM_UTILISATEUR= voir les informatiosn dans la documentations 

1. creer un fichier .env dans la dossier api qui ce trouve dans Backend.
2. entrez vos variable d'environement sous les noms suivants :

VITE_API_URL= Votre URL de l'API 
VITE_STRIPE_PUBLIC= VOtre cles STRIPE public 


https://bercker-studi-decembre-25-slgc.vercel.app/

##Admin 
les informations et code admin sont dans la documentation à rendre copier coller les informations admin pour que cela fonctionne. 
