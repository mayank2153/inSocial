import passport from 'passport';
import { Strategy } from 'passport-discord';
import {User} from '../models/user.model.js';

passport.use(
    new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/users/auth/discord/redirect',
        scope: ['identify', 'email'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ userName: profile.username });

            if (existingUser) {
                return done(null, existingUser);
            } else {
                // Check if the username is already taken
                let count = 1;
                let newUsername = profile.username;

                while (await User.findOne({ userName: newUsername })) {
                    // Append a number to make the username unique
                    newUsername = `${profile.username}${count}`;
                    count++;
                }

                const newUser = new User({
                    _id: profile.id,
                    userName: newUsername,
                    email: profile.email || '',
                    // Add other fields as needed
                });

                const savedUser = await newUser.save();
                return done(null, savedUser);
            }
        } catch (error) {
            console.error('Error:', error);
            return done(error, null);
        }
    })
);

export default passport;
