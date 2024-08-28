const express = require('express');
const app = express();

// partie 1
// //middleware
// app.use((req , res, next) => {
//     console.log('requete reçu !');
//     next() //Pour permettre au serveur de renvoyer le prochain requete sinn il va stopper au premier passer d'une fontion(middleware) a l'autre 
// });

// app.use((req, res, next) => {
//     res.status(201); // ajoute un code d'état 201 à la réponse et passe l'exécution ;
//     next();
//   });

// app.use((req , res, next) => {
//     res.json({message: 'votre requete a bien étais reçu !'});
//     next();
// })

// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès !');
//   });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });
module.exports = app;
