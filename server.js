const express = require("express");
//const jsoning = require('jsoning');

//const database = new jsoning("database.json");
 
const app = express();
const fs = require('fs');
 
app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(express.json()); //Used to parse JSON bodies

const routes = require('./routes/routes.js')(app, fs);
//app.post('/add-book', function (req, res) {
    //console.log(JSON.stringify(req.body));
//    res.sendStatus('200');
//});
 
const server = app.listen(8081, function(){
    const port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

