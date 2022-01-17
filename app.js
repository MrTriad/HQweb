"use strict"

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, function(){
    console.log("server is listening on port: "+port);
});