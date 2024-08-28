const express = require('express');
const app = express();
const Thing = require('./models/thing');

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
const PORT = process.env.PORT || 3000; 
const mongoose = require('mongoose');

// Connexion à MongoDB compass
mongoose.connect('mongodb://localhost:27017/sidyBD')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Connexion à MongoDB échouée !', err));
  
  app.use(express.json());
  
  // Lancer le serveur Express (si nécessaire)
//   app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées
    next();
});
//permet seulement l'enregistrement dans la base de donnée 
app.post('/api/stuff', (req, res, next) => {
        delete req.body._id;
        const thing = new Thing({
          ...req.body
        });
        thing.save()
          .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
          .catch(error => res.status(400).json({ error }));
      });


// permet de mettre a jour de modifier les renseignements de l'élément selectionner 
app.put('/api/stuff/:id', (req, res, next) => {
        Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });

// permet de supprimer l'élément selectionner 
app.delete('/api/stuff/:id', (req, res, next) => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });

//permet d'afficher les renseignement de l'objet aprés appuie
app.get('/api/stuff/:id', (req, res, next) => {
        Thing.findOne({ _id: req.params.id })
          .then(thing => res.status(200).json(thing))
          .catch(error => res.status(404).json({ error }));
      });

// aprés remplissage du formulaire de vendre un objet l'objet a vendre va s'afficher 
// directement dans la partie des objets
app.get('/api/stuff', (req, res, next) => {
    // const stuff = [
    //     {
    //         _id: 'oeihfzeoi',
    //         title: 'Mon premier objet',
    //         description: 'Les infos de mon premier objet',
    //         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //         price: 4900,
    //         userId: 'qsomihvqios',
    //     },
    //     {
    //         _id: 'oeihfzeomoihi',
    //         title: 'Mon deuxième objet',
    //         description: 'Les infos de mon deuxième objet',
    //         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //         price: 2900,
    //         userId: 'qsomihvqios',
    //     },
    // ];
    // res.status(200).json(stuff);
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
});
module.exports = app;
