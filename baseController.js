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
            }else if(err.name == 'MissingPasswordError' || err.name == 'MissingUsernameError'){
                var message = "Please enter a valid username and password!"
            }else{
                var message = "Some unknown error occured, contact the developer! Ref id:" + err.name;
            }
            res.render('create.ejs', {message:message});
            return console.log('Signup error:' + err.name);
        }else{
            passport.authenticate("local")(req,res, function(){
                console.log('created:' + user.username);
                res.cookie("username", user.username);
                res.redirect("/user");
            });
        };
    });
}

const login = (req,res) => {
    res.render("login.ejs", {message:""});
}

const tryLogin = (req,res) => {
    console.log('logged in!\n');
    console.log(req.user.username);
    res.cookie("username", req.user.username);
    res.redirect("/user");
}

const loggedIn = (req,res) => {
    const username = req.cookies.username;
    User.findOne({username : username}, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            var secrets = foundUser.secrets;
            var users = {foundUser, secrets};
            res.render("user.ejs", {user:users});
        }
    });
    //=================================
    //          editable post?       //
    //================================= 
}

const logout = (req,res) => {
    console.log("Logging out " + req.cookies.username);
    res.clearCookie('connect.sid');
    res.clearCookie('username');
    req.logout();
    res.redirect("/");
}

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.render('login.ejs', {message:"Log in first!"});
}

const isLoggedOut = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/user');
}

const submitSecret = (req,res) => {
    var secret = req.body.secret;
    var username = req.cookies.username;

    User.findOne({username:username}, function(err,user){
        if (err){
            console.log(err)
        }else{
            user.secrets.push({
                content: secret
            });

            user.save((err, result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log(result);
                    res.redirect("/user");
                }
            });
        }
    })
}


module.exports = {
    index,
    create,
    created,
    login,
    tryLogin,
    loggedIn,
    isLoggedIn,
    isLoggedOut,
    logout,

    submitSecret
}
