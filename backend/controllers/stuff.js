const thing = require('../models/thing');
const Thing = require('../models/thing');
const fs = require('fs'); //Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.

exports.creatThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};
// modifier par rapport a avant ou on avait UE UPDATE etc ici on y ajoue la modifiation de l'image qui est bcp plus complexe 
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteThing = (req, res, next) => {
    // Thing.deleteOne({ _id: req.params.id })
    //     .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    //     .catch(error => res.status(400).json({ error })); 
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });

};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllStuff = async (req, res, next) => {
    try {
        const things = await Thing.find().sort({ createdAt: -1 }); // permet d'ordonner les objets sans vouloir ordonner il y'a pas les async await etc juste Thing.find()
        // const formattedThings = things.map(thing => ({
        //     ...thing.toObject(), // Convertir le document Mongoose en objet JavaScript pur 
        //     createdAt: thing.createdAt // Inclure explicitement `createdAt` 
        // }));  
        res.status(200).json(things);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


