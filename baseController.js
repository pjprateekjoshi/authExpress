var express = require('express'); //check for necessity in future
app = express(); //check for necessity in future

User = require('./App/modules/User.js');

//real auth tools here:
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

app.use(require("express-session")({
    secret: "someText",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
//

const index = (req,res) => {
    res.render("index.ejs");
}

const create = (req,res) => {
    res.render("create.ejs", {message:""});
}

const created = (req,res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            if(err.name == 'UserExistsError'){
                var message = "Username already exists..."
            }else{
                var message = "Please enter a valid password!"
            }
            res.render('create.ejs', {message:message});
            return console.log(err.name);
        }else{
            passport.authenticate("local")(req,res, function(){
                // console.log('created! \n'+user)
                res.redirect("/user");
            });
        };
    });
}

const login = (req,res) => {
    res.render("login.ejs");
}

const tryLogin = (req,res) => {
    console.log('logged in!\n');
    // //if authenticated: create session then:
    //   res.redirect("/user");
    // //else res.redirect("/login"); alongwith the message of wrong credentials
}

const loggedIn = (req,res) => {
    // //cookie not defined as require('cookie'), neither installed
    // res.setHeader('Set-Cookie', cookie.serialize('username', String(req.username), {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 24 * 7 // 1 week
    //   }));
   
    //   // Redirect back after setting cookie
    //   res.statusCode = 302;
    //   res.setHeader('Location', req.headers.referer || '/');
      res.send("This is your post");
    //   res.end();
    //   return;
    // // editable post?
}

const logout = (req,res) => {
    req.logout();
    res.redirect("/");
}

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = {
    index,
    create,
    created,
    login,
    tryLogin,
    loggedIn,
    isLoggedIn,
    logout
}
