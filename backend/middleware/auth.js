const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'THIS_IS_A_TOKEN_FOR_MY_API_PIICANTE_FOR_OPENCLASSROOMS_COURSE');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ID de l\'utilisateur incorrect';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide !')
        });
    }
};