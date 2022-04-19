const multer = require('multer');

const MIME_TYPES = {

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


// Création de la sauvegarde des fichiers 

const storage = multer.diskStorage({

    // On défini où seront stocké les fichiers

    destination: (req, file, callback) => {

        callback(null, 'images')
    },

    // Définition du nom des fichiers

    filename: (req, file, callback) => {

        // On récupére le nom du fichier d'origine

        const name = file.originalname.split(' ').join('_');

        // On créer l'extension du fichier

        const extension = MIME_TYPES[file.mimetype];

        // Création du nouveau nom de fichier

        callback(null, name + Date.now() + '.' + extension);
    }
})

// Mise à disposition du middleware avec l'objet storage

module.exports = multer({ storage }).single('image');