// this file is all about setup and configuration of passport

const passport = require('passport'); // this module gives express the idea of how to handle authentication
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//here is one arguement means we are trying to load something in
//mongoose. 'User' object here is our model class
// we use model class to create a  new model instance
//and save it to the database
const User = mongoose.model('users');

//taking a user model and put it into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//taking the  id that we put into cookie
//and convert into a user model
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       //we already have a record with the given id
    //       done(null, existingUser);
    //     } else {
    //       //we dont have a user record with this id , make a new record
    //       new User({ googleId: profile.id })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    // }
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //we already have a record with the given id
        return done(null, existingUser);
      }
      //we dont have a user record with this id , make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
