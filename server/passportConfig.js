const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("./userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User=require('./models/users')
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
       // callbackURL: "http://localhost:3000/pro",
       callbackURL: "http://localhost:8000/auth/google/callback",
        passReqToCallback: true
    }, passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "secretKey",
            },
            async (jwtPayload, done) => {
                try {
                    let existingUser = await User.findOne({ id:jwtPayload._id });
                    // if user exists return the user 
                    if (existingUser) {
                       
                        return done(null, existingUser);

                    }
                    // if user does not exist create a new user 
                    console.log('Creating new user...');
                    const newUser = new User({
                        method: 'google',
                        google: {
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }
                    });
                    await newUser.save();
                    const user = jwtPayload.user;
                    done(null, user);
                } catch (error) {
                    return done(error, false)
                }
            }
        ))
    ))
}