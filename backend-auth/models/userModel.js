const mongoose = require("mongoose");

//create our user schema, javascript object that holds format of how a user object will be stored in our database

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    displayName: {type: String} //optional
});

//export our model, can search for and save users

module.exports = User = mongoose.model("user", userSchema);