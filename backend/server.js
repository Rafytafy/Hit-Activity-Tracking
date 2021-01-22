const express        = require('express'),
      bodyParser     = require('body-parser'),
      cors           = require('cors'),
      admin          = require('firebase-admin'),
      serviceAccount = require('./serviceAccountKey.json'),
      app            = express();

const { isAuthenticated } = require('./middleware')

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com"
});

//Bodyparser and cors
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes 
app.post('/register', isAuthenticated, (req, res)=>{
    res.send(req.body.uid)
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));