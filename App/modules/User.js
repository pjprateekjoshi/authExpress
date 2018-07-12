var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost/authExpress-test");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    post: String
});

var User = mongoose.model("User", userSchema);

userSchema.plugin(passportLocalMongoose);

module.exports = User;