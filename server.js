const express = require("express");
const jsoning = require('jsoning');
const bodyParser = require('body-parser');
const database = new jsoning("database.json");
 
const app = express();
 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
 
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

app.post('/add-book', function (req, res) {
    console.log(req);
    //res.send('POST Request');
});
 
const server = app.listen(8081, function(){
    const port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

