const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const stuffRoutes = require('./routes/stuff')

const PORT = process.env.PORT || 3000; 
const mongoose = require('mongoose');

// Connexion à MongoDB compass
mongoose.connect('mongodb://localhost:27017/sidyBD')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Connexion à MongoDB échouée !', err));
  
  app.use(express.json());
  
  // Lancer le serveur Express (si nécessaire)
//   app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));


// Configuration de CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use(bodyparser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;
