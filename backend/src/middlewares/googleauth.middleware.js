import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { User } from "../models/user.model.js"

// serializing user
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//deserializing user
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://whisperhub.onrender.com/users/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("enterd")
                let existingUser = await User.findOne({ email: profile.emails[0]?.value });
                console.log("existing?,",existingUser)

                if (existingUser) {
                    
                    return done(null, existingUser);
                } else {
                    // Create a new user
                    const newUser = new User({
                        profileId: profile.id,
                        userName: profile.displayName || profile.emails[0]?.value || "user",
                        email: profile.emails ? profile.emails[0].value : null,
                        avatar: "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1724915616/pp_ie45f1.jpg"
                    });

                    const savedUser = await newUser.save();
                    return done(null, savedUser);
                }
            } catch (error) {
                console.error("Error:", error);
                return done(error, null);
            }
        }
    )
);



export default passport;