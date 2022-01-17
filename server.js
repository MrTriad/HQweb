

const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const houseworksRouter = require('./routes/houseworks')
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
});


app.use('/houseworks', houseworksRouter)


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});