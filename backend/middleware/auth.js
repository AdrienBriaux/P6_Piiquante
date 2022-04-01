const webToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = webToken.verify(token, 'TheSkyIsBlueAndItsBetterLikeThat!');
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';

        } else {

            next();
        }

    } catch {

        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};