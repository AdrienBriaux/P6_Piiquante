
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Controleur de création d'une sauce

exports.createThing = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    const sauce = new Sauce({

        ...sauceObject,
        imageUrl: `http://localhost:3000/images/${req.file.filename}`
    });

    sauce.save()

        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};


// Controleur pour prendre une sauce 

exports.getOneThing = (req, res, next) => {

    Sauce.findOne()
    
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Controleur prendre toutes les sauces

exports.getAllThings = (req, res, next) => {

    Sauce.find()

        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};


// Controleur supprimer sauce

exports.deleteThing = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })

        .then(sauce => {

            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Sauce.deleteOne({ _id: req.params.id })

                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })

        .catch(error => res.status(500).json({ error }));
};

