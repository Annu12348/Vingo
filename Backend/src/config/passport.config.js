import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config.js";

passport.use(
  "google-register",
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          fullname: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          imageUrl: profile.photos?.[0]?.value,
          provider: "google",
          role: "deliveryBoy",
        };

        return done(null, userData);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.use(
  "google-login",
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_LOGIN_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      const userData = {
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        imageUrl: profile.photos?.[0]?.value,
        provider: "google",
        role: "deliveryBoy",
      };

      return done(null, userData);
    }
  )
);

export default passport;
