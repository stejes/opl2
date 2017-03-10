// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        autoIncrement = require('mongoose-auto-increment');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

var connection = mongoose.connect('mongodb://localhost/eindtaak');     // connect to mongoDB database on modulus.io
autoIncrement.initialize(connection);


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

var oplSchema = new Schema({
    oplCode: Number,
    oplNaam: String,
    beschrijving: String,
    maxDuur: Number
});

var curSchema = new Schema({
    IKLnr: Number,
    rijksregNr: String,
    familienaam: String,
    voornaam: String,
    adres: String,
    email: String,
    telnr: String,
    foto: String,
    opleidingen: [{type: Number, ref:'Opleiding'}]
});



curSchema.plugin(autoIncrement.plugin,{model:'Cursist', field:'IKLnr'});
curSchema.plugin(autoIncrement.plugin,{model:'Opleiding', field:'oplCode'});
//define model
var Cursist = mongoose.model('Cursist', curSchema, "cursisten");
var Opleiding = mongoose.model('Opleiding', oplSchema, "opleidingen");


// routes ======================================================================

// api ---------------------------------------------------------------------
// 
// 
// // get alle cursisten
app.get('/api/cursisten', function (req, res) {

    // use mongoose to get all todos in the database
    Cursist.find(function (err, cursisten) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(cursisten); // return all todos in JSON format
        //res.json({"test":"jaja"});
    });
});

// create todo and send back all todos after creation
app.post('/api/cursisten', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Cursist.create({
        //IKLnr: 11111,
        rijksregNr: req.body.rijksregNr,
        familienaam: req.body.familienaam,
        voornaam: req.body.voornaam,
        adres: req.body.adres,
        email: req.body.email,
        telnr: req.body.telnr,
        foto: req.body.foto,
        opleidingen: req.body.opleidingen
    }, function (err, cursist) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Cursist.find(function (err, cursisten) {
            if (err)
                res.send(err);
            res.json(cursisten);
        });
    });

});

// delete a todo
app.delete('/api/cursisten/:cursist_id', function (req, res) {
    Cursist.remove({
        _id: req.params.cursist_id
    }, function (err, cursist) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Cursist.find(function (err, cursisten) {
            if (err)
                res.send(err)
            res.json(cursisten);
        });
    });
});
// 
// get all todos
app.get('/api/opleidingen', function (req, res) {

    // use mongoose to get all todos in the database
    Opleiding.find(function (err, opleidingen) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(opleidingen); // return all todos in JSON format
        //res.json({"test":"jaja"});
    });
});

app.get('/api/opleidingen/:opleiding_id', function (req, res) {

    // use mongoose to get all todos in the database
    Opleiding.find({'id': req.params.opleiding_id}, function (err, opleiding) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(opleiding); // return all todos in JSON format
        //res.json({"test":"jaja"});
    });
});

// create todo and send back all todos after creation
app.post('/api/opleidingen', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Opleiding.create({
        test: req.body.test,
        done: false
    }, function (err, opleiding) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Opleiding.find(function (err, opleidingen) {
            if (err)
                res.send(err);
            res.json(opleidingen);
        });
    });

});

// delete a todo
app.delete('/api/opleidingen/:opleiding_id', function (req, res) {
    Opleiding.remove({
        _id: req.params.opleiding_id
    }, function (err, opleiding) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Opleiding.find(function (err, opleidingen) {
            if (err)
                res.send(err)
            res.json(opleidingen);
        });
    });
});


 // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");