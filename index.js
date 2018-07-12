var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');

app.use(bodyParser.urlencoded({extended:true}));

var baseController = require('./baseController.js');

const port = process.env.PORT || 8000;

app.get('/', (req,res) => {baseController.index(req,res)});

app.get('/create', (req,res) => {baseController.create(req,res)});

app.post('/create', (req,res) => {baseController.created(req,res)});

app.get('/login', (req,res) => {baseController.login(req,res)});

app.post('/login', (req,res) => {baseController.tryLogin(req,res)});

app.get('/user', (req,res) => {baseController.loggedIn(req,res)});

app.listen(port, ()=>{console.log(`Listening on port ${port}.............`)});
