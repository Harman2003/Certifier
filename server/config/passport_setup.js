const passport = require('passport');
const User = require('../models/user');

const googleStartegy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function(user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
})

passport.use(new googleStartegy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true 
},
function(req,accessToken,refreshToken,profile,done){
    console.log(profile);
    try{
        console.log(profile.displayName,profile.email);
        const user = User.create({
            user_name: profile.displayName,
            email : profile.email
        })
        console.log("User has been created Successfully !!");
    }catch(err){
        if(err){
            console.log("error in creating user : ",err);
        }
    }
    
    return done(null,profile);
}
))