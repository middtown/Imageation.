const mongoose = require("mongoose");
/************
 * DATABASE *
 ************/
//connection to heroku and local comp.
mongoose.connect( process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URI || "mongodb://heroku_w28wc62h:djjiidscvapqmi195pggg7kodu@ds231758.mlab.com:31758/heroku_w28wc62h" ||"mongodb://localhost:27017/imageation"); 
mongoose.Promise = global.Promise;

let Project = require ("./project");
let User = require("./user");

module.exports.Project = require ("./project.js");
module.exports.User = require("./user.js"); 
