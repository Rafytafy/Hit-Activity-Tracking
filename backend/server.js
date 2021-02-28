const express        = require('express'),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      cors           = require('cors'),
      admin          = require('firebase-admin'),
      serviceAccount = require('./serviceAccountKey.json'),
      app            = express();

const { isAuthenticated } = require('./middleware');


const register   = require('./routes/register/register'),
      trainer    = require('./routes/trainer/trainer'),
      workout    = require('./routes/workout/workout'),
      subscriber = require('./routes/subscriber/subscriber'),
      routine    = require('./routes/routine/routine'),
      subData    = require('./routes/subData/subData');

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com"
});

//Bodyparser and cors
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Database config
const db = require('./config/mongoKey.js').mongoURI;

//Connect to the database
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongoDB Connected..."))
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

//Routes 
app.use('/register', register);
app.use('/subData',subData)
app.use('/trainer', trainer);
app.use('/subscriber', subscriber);
app.use('/workout', workout);
app.use('/routine', routine);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));