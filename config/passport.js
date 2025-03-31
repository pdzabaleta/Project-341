const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:8080/auth/github/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log("GitHub Profile:", profile); 

      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = new User({
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null, // Avoid undefined errors
          profileUrl: profile.profileUrl,
        });
        await user.save();
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
