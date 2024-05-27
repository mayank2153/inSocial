import passport from "passport"
import { strategy } from "passport-google-oauth20"
import { User } from "../models/user.model"

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
    new strategy({
        
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : "http://localhost:8000/users/auth/google/redirect"
    },

    async (accessToken, refreshToken, profile, done ) => {
        let findUser;
        try {
            findUser = await User.findOne({profileId : profile.id});

        } catch (error) {
            console.log("there seems to be some problem in finding user in database");
            return done(error, null);
        }

        try {
            if(!findUser){
                const newUser = new User({
                    profileId : profile.id, 
                    username : profile.displayName ? profile.displayName : "EmmptyUsername",
                    email: profile.emails ? profile.emails[0].value : null
                })

                const newsavedUser = await newUser.save();
                done(null, newsavedUser)
            }
            else{
                done(null, findUser)
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
)
)

export default passport;