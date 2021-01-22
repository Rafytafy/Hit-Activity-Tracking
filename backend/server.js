const express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      admin      = require('firebase-admin'),
      serviceAccount = require('./serviceAccountKey.json'),
      app        = express();


admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com"
});


//Bodyparser and cors
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const isAuthenticated = (req, res, next) => {
    let tokenId = req.body.tokenId
    console.log(tokenId)
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

app.post('/register', isAuthenticated, (req, res)=>{
    console.log(req.body.uid)
    res.send(req.body.uid)
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));