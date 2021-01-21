const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express();


//Bodyparser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));