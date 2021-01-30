const express        = require('express'),
      bodyParser     = require('body-parser'),
      cors           = require('cors'),
      admin          = require('firebase-admin'),
      serviceAccount = require('./serviceAccountKey.json'),
      app            = express();

const { isAuthenticated } = require('./middleware');
const Subscriber = require('./models/Subscriber');

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

app.post('/register/subscriber', isAuthenticated, (req, res) => {
    
        const newSub = new Subscriber({
                             
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            email: req.body.email,
            birthdate: req.body.birthdate,
            weight: req.body.weight,
            height:{
                feet:req.body.feet,
                inches:req.body.inches
            },
        })
    
        newSub.save().then(item => res.json(item));
    })
  


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));