const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const User = require('../models/User');

// Controleur création d'utilisateur

exports.signup = (req, res, next) => {

    // On Hash le mot de passe avec bcrypt

    bcrypt.hash(req.body.password, 10)

        .then(hash => {

            // On créer un nouvel objet utilisateur avec le mot de passe haché

            const user = new User({

                email: req.body.email,
                password: hash
            });

            // On sauvegarde l'objet utilisateur

            user.save()

                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })

        .catch(error => res.status(500).json({ error }));
};

// Controleur connection utilisateur

exports.login = (req, res, next) => {

    // On cherche si l'email existe dans la base de données

    User.findOne({ email: req.body.email })

        .then(user => {

            // Si l'utilisateur nest pas trouvé

            if (!user) {

                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // On utilise la fonction "compare" avec bcrypt pour savoir si le mot de passe peut générer la même empreinte que le hash

            bcrypt.compare(req.body.password, user.password)

                .then(validation => {

                    // Si le mot de passe est incorrect
                    if (!validation) {

                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    // On renvoi l'user ID ainsi que son token d'authentification

                    res.status(200).json({

                        userId: user._id,

                        // On créer un token d'autentification qui sera retourné

                        token: webToken.sign({ userId: user._id },
                            process.env.SecretKey,
                            { expiresIn: '2h' })
                    });
                })

                .catch(error => res.status(500).json({ error }));
        })

        .catch(error => res.status(500).json({ error }));
};