const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const config = require("../config/index");

const callBackUrl = `http://${config.protocol.server_origin}${config.google.client_uri}`;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.client_id,
      clientSecret: config.google.client_secret,
      callbackURL: callBackUrl,
      passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
