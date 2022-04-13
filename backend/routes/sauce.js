const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

// Route pour ajouter une nouvelle sauce

router.post('/', auth, multer, sauceCtrl.createSauce);

// Route pour envoyer les likes/dislikes/annuler

router.post('/:id/like', auth, sauceCtrl.likeSauce);

// Route pour modifier une sauce

router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Route pour supprimer une sauce

router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Route pour prendre une seul sauce

router.get('/:id', auth, sauceCtrl.getOneSauce);

// Route pour récupérer toutes les sauces

router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;