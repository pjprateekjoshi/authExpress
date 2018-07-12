var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');

app.use(bodyParser.urlencoded({extended:true}));

var baseController = require('./baseController.js');

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






const port = process.env.PORT || 8000;

app.get('/', (req,res) => {baseController.index(req,res)});

app.get('/create', (req,res) => {baseController.create(req,res)});

app.post('/create', (req,res) => {baseController.created(req,res)});

app.get('/login', (req,res) => {baseController.login(req,res)});

app.post('/login', passport.authenticate("local",{
    successRedirect: "/user",
    failureRedirect: "/login"
}), (req,res) => {baseController.tryLogin(req,res)});

app.get('/logout', (req,res) => {
    req.logout();
    res.redirect("/");
});

app.get('/user', baseController.isLoggedIn, (req,res) => {baseController.loggedIn(req,res)});

app.listen(port, ()=>{console.log(`Listening on port ${port}.............`)});
