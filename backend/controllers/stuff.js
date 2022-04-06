const Sauce = require('../models/Sauce');
const fs = require('fs');

// Controleur de création d'une sauce

exports.createThing = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    const sauce = new Sauce({

        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save()

        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};


// Controleur pour prendre une sauce 

exports.getOneThing = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })

        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Controlleur pour modifier une sauce

exports.modifyThing = (req, res, next) => {

    const sauceObject = req.file ? {

        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

        : { ...req.body };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })

        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

// Controleur prendre toutes les sauces

exports.getAllThings = (req, res, next) => {

    Sauce.find()

        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};


// Controleur supprimer la sauce

exports.deleteThing = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })

        .then(sauce => {

            // Si la sauce appartient à l'utilisateur

            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Sauce.deleteOne({ _id: req.params.id })

                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })

        .catch(error => res.status(500).json({ error }));
};


/////////// Controlleur pour liker/disliker/annuler un like /////////////


exports.likeThing = (req, res, next) => {
    console.log(req.body)

    // Pour un like

    if (req.body.like === 1) {

        Sauce.updateOne({ _id: req.params.id },

            {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    };

    // Pour un dislike

    if (req.body.like === -1) {

        Sauce.updateOne({ _id: req.params.id },

            {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    };

    // Pour annuler un like

    if (req.body.like === 0) {

        Sauce.findOne({ _id: req.params.id })

            .then(sauce => {

                if (sauce.usersLiked.includes(req.body.userId)) {

                    Sauce.updateOne({ _id: req.params.id },

                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })

                        .then(() => res.status(200).json({ message: 'Like annulé' }))
                        .catch(error => res.status(400).json({ error }))
                }

                if (sauce.usersDisliked.includes(req.body.userId)) {

                    Sauce.updateOne({ _id: req.params.id },

                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        })

                        .then(() => res.status(200).json({ message: 'Dislike annulé' }))
                        .catch(error => res.status(400).json({ error }))
                }
            });

    }
};