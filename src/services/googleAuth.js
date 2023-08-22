const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../dal/models/user.model');

const router = express.Router();


app.use(session({
    secret: 'your-session-secret', // Use a secure secret for session management
    resave: false,
    saveUninitialized: true
}));
  

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // This should match the authorized redirect URI in your Google API credentials
  }, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({
        accountId: profile.id,
        provider: 'github',
      });
      if (!user) {
        console.log('Adding new github user to DB..');
        const user = new User({
          accountId: profile.id,
          name: profile.username,
          provider: profile.provider,
        });
        await user.save();
        // console.log(user);
        return done(null, profile);
      } else {
        console.log('Github user already exist in DB..');
        // console.log(profile);
        return done(null, profile);
      }
  }));

passport.serializeUser((user, done) => {
    // Serialize the user ID or relevant information into a session.
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    // Retrieve the user from the session.
    done(null, user);
});
  
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile', // Redirect on successful authentication
  failureRedirect: '/' // Redirect on failed authentication
}));
