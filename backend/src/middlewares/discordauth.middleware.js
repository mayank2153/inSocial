import passport from "passport";
import { Strategy } from "passport-discord";

passport.use(
    new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL : "http://localhost:8000/users/auth/discord/redirect",
        scope: ["identify", "email"]
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            findUser = await User.findOne({profileId : profile.id});
            
        } catch (error) {
            console.log("there seems to be an problem in finding user", error);
        }

        try {
            if(!findUser){
                const newUser = new User({
                    profileId : profile.id,
                    email: profile.email,
                    username: profile.username,
                })

                const newsavedUser = await newUser.save()
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

export default passport
