const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});