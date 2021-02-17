const admin = require('firebase-admin');

module.exports.isAuthenticated = (req, res, next) => {
    let tokenId = req.body.tokenId
   
    admin
        .auth()
        .verifyIdToken(tokenId)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            req.body.uid = uid;
            next();
        })
        .catch((error) => {
            res.send(`There was an error in authentication. Error: ${error}`)
        });
}
