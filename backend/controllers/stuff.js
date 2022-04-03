const Sauce = require('../models/Sauce');


// Controleur de création d'une sauce

exports.createThing = (req, res, next) => {

    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllThings = (req, res, next) => {

    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {

    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ mesage: 'Sauce supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};