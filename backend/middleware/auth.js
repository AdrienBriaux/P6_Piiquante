const webToken = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = webToken.verify(token, process.env.SecretKey);
        const userId = decodedToken.userId;
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId) {

            return res.status(403).json({
                error: 'unauthorized request'
            });
        }

        else {

            next();
        }

    }

    catch {

        res.status(401).json({
            error: new Error('Invalid request or token expired')
        });
    }
};