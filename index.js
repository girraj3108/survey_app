const express = require('express'); //common JS modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //library to access the cookies
const passport = require('passport'); // library to tell passport to make use of cookie
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

//all the below 4 middleware used for
// every request that comes to our application

//anytime when any request come to the body
//bodyParser middleware will parse the body
//and assign it to the req.body property  of
// the incoming request object
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
// clientID
//1071348436222-qjrdaspsdvtsjaiigtls7rb1n60tot6n.apps.googleusercontent.com

//clientSecret
// Mq0U2cKj5bSrWnnlhRomUy7d

//route handler
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy ' });
// });

// both of the files here authRoutes and billingRoutes
// returns a functionn here.
//so the require statement here will turn into a function
// which  will immediately called with the express object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// code run only if  the app in production
// or code for production
if (process.env.NODE_ENV === 'production') {
  // here we have to do two things so that the
  // express handles everything correctly

  //express will serve up production assets
  // like our main.js  file or main.css file
  app.use(express.static('client/build'));
  // express will serve up the index.html file if it doesnt
  // recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
