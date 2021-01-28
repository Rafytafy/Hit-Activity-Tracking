const express        = require('express'),
      bodyParser     = require('body-parser'),
      cors           = require('cors'),
      admin          = require('firebase-admin'),
      serviceAccount = require('./serviceAccountKey.json'),
      app            = express();

const { isAuthenticated } = require('./middleware')

var register = require('./routes/register/register')

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com"
});

//Bodyparser and cors
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes 
app.use('/register', register);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));