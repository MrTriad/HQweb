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

///////////////////////////////////////////////////////////////////////////
///// Views setup /////////////////////////////////////////////////////////

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

///////////////////////////////////////////////////////////////////////////
///// Routes setup ////////////////////////////////////////////////////////

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

///////////////////////////////////////////////////////////////////////////
///// Server start ////////////////////////////////////////////////////////

app.listen(port, function(){
    console.log("server is listening on port: "+port);
});