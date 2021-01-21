const express    = require('express'),
      bodyParser = require('body-parser'),
      admin      = require('firebase-admin'),
      serviceAccount = require('serviceAccountKey.json'),
      app        = express();


admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com"
});


//Bodyparser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const isAuthenticated = (req, res, next) => {

}

app.post('/register', isAuthenticated, (req, res)=>{

})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));