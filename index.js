var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

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

app.get('/', baseController.isLoggedOut, (req,res) => {baseController.index(req,res)});

app.get('/create', baseController.isLoggedOut, (req,res) => {baseController.create(req,res)});

app.post('/create', (req,res) => {baseController.created(req,res)});

app.get('/login', baseController.isLoggedOut, (req,res) => {baseController.login(req,res)});

app.post('/login', passport.authenticate("local",{
    failureRedirect: "/login"
}), (req,res) => {baseController.tryLogin(req,res)});

app.get('/logout', (req,res) => {baseController.logout(req,res)});

app.get('/user', baseController.isLoggedIn, (req,res) => {baseController.loggedIn(req,res)});

app.listen(port, ()=>{console.log(`Listening on port ${port}.............`)});
