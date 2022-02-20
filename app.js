"use strict"

///////////////////////////////////////////////////////////////////////////
///// Server setup ////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 3000;
app.use(express.static(__dirname + '/public'));
app.locals.basedir = path.join(__dirname, 'views');
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.urlencoded({ extended: true }));

const flash = require('express-flash')
app.use(flash())

const mongoose = require('mongoose')
//TODO add env for password
const MONGO_URI = "mongodb+srv://HQ:GVDB1337@hqfirst.2jyxa.mongodb.net/HQwebDB1?retryWrites=true&w=majority";
const clientDB = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(m => m.connection.getClient())
	.catch(err => console.log(err));


const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'secretsecret',   //TODO make private
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: clientDB,
    dbName: 'HQwebDB1',
    stringify: false,
    autoRemove: 'interval',
    autoRemoveInterval: 1
  })
}));

const passport = require("./server/passport/setup");
app.use(passport.initialize());
app.use(passport.session());


///////////////////////////////////////////////////////////////////////////
///// Views setup /////////////////////////////////////////////////////////

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

///////////////////////////////////////////////////////////////////////////
///// Routes setup ////////////////////////////////////////////////////////

const apiRouter = require("./server/routes/api/auth");
app.use("/api", apiRouter);
const indexRouter = require("./server/routes/index");
app.use("/", indexRouter);

///////////////////////////////////////////////////////////////////////////
///// Server start ////////////////////////////////////////////////////////

app.listen(port, function(){
    console.log("server is listening on port: "+port);
});


