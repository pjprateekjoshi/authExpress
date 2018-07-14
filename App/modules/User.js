var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require ('mongoose');
mongoose.connect("mongodb://pjprateekjoshi:password0@ds137631.mlab.com:37631/auth-express");

var secretSchema = new mongoose.Schema({
    content: String
});
var Secret = mongoose.model("Secret", secretSchema);


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    secrets: [secretSchema]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;