"use strict"

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

///////////////////////////////////////////////////////////////////////////
///// Server setup ////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 3000;
const flash = require('express-flash')
app.use(express.static(__dirname + '/public'));
app.locals.basedir = path.join(__dirname, 'views');
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.urlencoded({ extended: true }));

app.locals.moment = require('moment');




///////////////////////////////////////////////////////////////////////////
///// Database Connection /////////////////////////////////////////////////

const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'?retryWrites=true&w=majority'
const clientDB = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(m => m.connection.getClient())
	.catch(err => console.log(err));

///////////////////////////////////////////////////////////////////////////
///// Session setup ///////////////////////////////////////////////////////


const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  secret: process.env.SESSION_SECRET,
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

app.use(flash())

app.use(function(req, res, next){
	res.locals.success_messages = req.flash('success_messages');
	res.locals.error_messages = req.flash('error_messages');
	next();
});



///////////////////////////////////////////////////////////////////////////
///// Views setup /////////////////////////////////////////////////////////

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

///////////////////////////////////////////////////////////////////////////
///// Routes setup ////////////////////////////////////////////////////////

const routerAuth = require("./server/routes/subroutes/auth");
app.use("/auth", routerAuth);
const routerBooking = require("./server/routes/subroutes/booking");
app.use("/booking", routerBooking);


const routerReview = require("./server/routes/subroutes/review");
app.use("/reviews", routerReview);

const routerShopping = require("./server/routes/subroutes/shopping");
app.use("/shopping", routerShopping);


const indexRouter = require("./server/routes/index");
app.use("/", indexRouter);

///////////////////////////////////////////////////////////////////////////
///// Server start ////////////////////////////////////////////////////////

app.listen(port, function(){
    console.log("server is listening on port: "+port);
});


