var express = require('express'); //check for necessity in future
app = express(); //check for necessity in future

User = require('./App/modules/User.js');






// //real auth tools here:
// var passport = require('passport');
// var LocalStrategy = require('passport-local');
// var passportLocalMongoose = require('passport-local-mongoose');

// app.use(require("express-session")({
//     secret: "someText",
//     resave: false,
//     saveUninitialized: false
// }));

// // app.use(passport: initialize());
// app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(User.authenticate()));
// //








const index = (req,res) => {
    res.render("index.ejs");
}

const create = (req,res) => {
    res.render("create.ejs");
}

const created = (req,res) => {
    //if valid data: insert to database, create session, then:
        var newUser = new User(req.body);
        newUser.save((err, user)=>{
            if(err) return console.log(err);
            console.log("Created a User!\n"+user);
        });
        res.redirect("/user");
    //in case invalid data is received, res.redirect("/create"); with validation message
}

const login = (req,res) => {
    res.render("login.ejs");
}

const tryLogin = (req,res) => {
    //if authenticated: create session then:
      res.redirect("/user");
    //else res.redirect("/login"); alongwith the message of wrong credentials
}

const loggedIn = (req,res) => {
    res.send("Checks whether logged in (session set) if not then redirects to /login.<br\>Welcome for new users, secret post display for existing users");
}

module.exports = {
    index,
    create,
    created,
    login,
    tryLogin,
    loggedIn
}
