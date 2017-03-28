// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        autoIncrement = require('mongoose-auto-increment'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)



// configuration =================

var connection = mongoose.connect('mongodb://localhost/eindtaak'); // connect to mongoDB database on modulus.io
autoIncrement.initialize(connection);
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
/*var gevolgdeSchema = new Schema({
 //IKLnr: Number,
 //oplCode: Number,
 cursist: {type: Number, ref: 'Cursist'},
 opleiding: {type: Number, ref: 'Opleiding'},
 startdatum: Date,
 einddatum: Date,
 geslaagd: Boolean
 });*/

var oplSchema = new Schema({
    oplCode: Number,
    naam: String,
    beschrijving: String,
    duurtijd: Number
});
//curSchema.plugin(autoIncrement.plugin, {model: 'Opleiding', field: 'oplCode'});
//define model


//var Gevolgde = mongoose.model('Gevolgde', gevolgdeSchema, "gevolgde");
var curSchema = new Schema({
    IKLnr: {type: Number/*, index: {unique: true, dropDups: true}*/},
    rijksregNr: String,
    familienaam: String,
    voornaam: String,
    adres: String,
    email: String,
    telnr: String,
    foto: String,
    opleidingen: [{
            opleiding: {type: Schema.Types.ObjectId, ref: 'Opleiding'},
            startdatum: Date,
            einddatum: Date,
            geslaagd: Boolean}]
});
curSchema.plugin(autoIncrement.plugin, {model: 'Cursist', field: 'IKLnr'});
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
app.get('/api/cursisten/:cursist_id', function (req, res) {
    Cursist
            .findOne({IKLnr: req.params.cursist_id})
            .populate({
                path: "opleidingen.opleiding"
                        //model: 'Opleiding'
            })

            .exec(function (err, cursist) {
                if (err)
                    res.send(err);
                //return handleError(err);
                console.log('The creator is %s', cursist.opleidingen);
                /*Cursist.findOne({IKLnr: req.params.cursist_id},
                 function (err, cursist) {
                 
                 
                 // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                 if (err || !cursist) {
                 res.send(err);
                 } else {
                 res.json(cursist);
                 //res.json({"test":"jaja"});
                 }
                 
                 });*/
                res.json(cursist);
            });
});
// create todo and send back all todos after creation
app.post('/api/cursisten', function (req, res) {
//console.log(req);
// create a todo, information comes from AJAX request from Angular
    Cursist.create({
//IKLnr: 11111,
        rijksregNr: req.body.rijksregNr,
        familienaam: req.body.familienaam,
        voornaam: req.body.voornaam,
        adres: req.body.adres,
        email: req.body.email,
        telnr: req.body.telnr,
        foto: req.body.foto
                //opleidingen: req.body.opleidingen
    }, function (err, cursist) {
        /*if (err)
         {
         console.log(err);
         return res.send(err);
         }
         //console.log(err);
         // get and return all the todos after you create another
         Cursist.find(function (err, cursisten) {
         if (err)
         return res.send(err);
         res.json(cursisten);
         });*/
        res.json(cursist);
    });
}
);
// delete a todo
app.delete('/api/cursisten/:cursist_id', function (req, res) {
    Cursist.remove({
        _id: req.params.cursist_id
    }, function (err, cursist) {
        if (err)
            return res.send(err);
        // get and return all the todos after you create another
        res.json(cursist);
    });
});

app.put('/api/cursisten/:cursist_id', function (req, res) {
    Cursist.findOneAndUpdate({IKLnr: req.params.cursist_id},
            {
                $set: {opleidingen: function () {
                        var opleidingen = [];

                        angular.forEach(req.body.opleidingen, function ($opleiding) {
                            var opleiding = {};
                            opleiding.opleiding = $opleiding._id;
                            opleiding.startdatum = $opleiding.startdatum;
                            opleidingen.push(opleiding);
                        });

                        return opleidingen;
                    }
                }
            }
    )
            .populate({
                path: "opleidingen.opleiding"
                        //model: 'Opleiding'
            })
            .exec(
                    function (err, cursist) {
                        if (err) {
                            console.log(err);
                        } else {
                            /*Cursist.findOne({IKLnr: req.params.cursist_id},
                             function (err, cursist) {
                             if (err) {
                             console.log(err);
                             } else {
                             console.log(cursist);
                             res.json(cursist);
                             }
                             });*/
                            res.json(cursist);
                        }
                    }
            );
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
app.get('/api/opleidingen/:oplCode', function (req, res) {

    // use mongoose to get all todos in the database

    Opleiding.findOne({oplCode: req.params.oplCode}, function (err, opleiding) {

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
        oplCode: req.body.oplCode,
        naam: req.body.naam,
        beschrijving: req.body.beschrijving,
        duurtijd: req.body.duurtijd
    }, function (err, opleiding) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
        res.json(opleiding);
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
        res.json(opleiding);
    });
});
/*app.get('/api/gevolgde/:cursist_id', function (req, res) {
 
 // use mongoose to get all todos in the database
 Gevolgde.find({cursist: req.params.cursist_id}, function (err, gevolgde) {
 
 // if there is an error retrieving, send the error. nothing after res.send(err) will execute
 if (err)
 res.send(err);
 
 res.json(gevolgde); // return all todos in JSON format
 //res.json({"test":"jaja"});
 });
 });*/
app.get('/api/cursisten/:cursist_id/gevolgde/:oplCode', function (req, res) {
    Cursist.findOne({IKLnr: req.params.cursist_id}, function (err, cursist) {
        var i;
        var found = false;
        //console.log("cur" + cursist.opleidingen[0]);
        for (i = 0; i < cursist.opleidingen.length; i++) {
            if (cursist.opleidingen[i].opleiding.oplCode == req.params.oplCode) {
                //res.json(cursist);//hier bezig, als check of opl mag toegevoegd worden of niet
                found = true;
            }
        }
        if (found) {
            res.json(cursist);
        } else {
            console.log("nope");
            res.json({duplicate: "no"});
        }
    });
});
app.delete('/api/cursisten/:cursist_id/gevolgde/:opl_id', function (req, res) {
    Cursist.findByIdAndUpdate(
            req.params.cursist_id,
            {$pull: {"opleidingen": {"_id": req.params.opl_id}}},
            {new : true}
    )
            .populate({
                path: "opleidingen.opleiding"
                        //model: 'Opleiding'
            })
            .exec(
                    function (err, cursist) {
                        if (err) {
                            console.log(err);
                        } else {
                            /*Cursist.findOne({IKLnr: req.params.cursist_id},
                             function (err, cursist) {
                             if (err) {
                             console.log(err);
                             } else {
                             console.log(cursist);
                             res.json(cursist);
                             }
                             });*/
                            res.json(cursist);
                        }
                    }
            );


});
app.post('/api/cursisten/:cursist_id/opleidingen/:opleiding_id', function (req, res) {
    /*Gevolgde.create({opleiding: req.body.oplCode, cursist: req.params.cursist_id}, function (err, gevolgdes) {
     if (err) {
     res.send(err);
     } else {
     Gevolgde.find(function (err, gevolgde) {
     if (err) {
     res.send(err);
     } else {
     res.json(gevolgde);
     }
     });
     }
     
     });*/

    Opleiding.findOne({_id: req.params.opleiding_id}, function (err, opleiding) {

        if (err)
            console.log(err);
        var query = {'IKLnr': req.params.cursist_id};

        var startdate = Date.parse(req.body.startdatum);
        var enddate = startdate + parseInt(opleiding.duurtijd) * 7 * 24 * 60 * 60 * 1000;
        var valQuery = {
            $or: [
                {'startdatum': {$gt: startdate, $lt: enddate}},
                {'einddatum': {$gt: startdate, $lt: enddate}},
                {
                    $and: [
                        {'startdatum': {$lt: startdate}},
                        {'einddatum': {$gt: enddate}}
                    ]
                },
                {
                    $and: [
                        {'startdatum': {$gt: startdate}},
                        {'einddatum': {$lt: enddate}}
                    ]
                }
            ]
        };/*hier bezig met conditionele query voor gevoglde toe te vogen*/
        //Cursist.find()

        Cursist.findOneAndUpdate(query, {
            $push: {"opleidingen": {"opleiding": opleiding._id, "startdatum": startdate, "einddatum": enddate, geslaagd: false}}}, {new : true, safe: true, upsert: true}




        )
                .populate({
                    path: "opleidingen.opleiding"
                            //model: 'Opleiding'
                })
                .exec(
                        function (err, cursist) {
                            if (err) {
                                console.log(err);
                            } else {
                                /*Cursist.findOne({IKLnr: req.params.cursist_id},
                                 function (err, cursist) {
                                 if (err) {
                                 console.log(err);
                                 } else {
                                 console.log(cursist);
                                 res.json(cursist);
                                 }
                                 });*/
                                res.json(cursist);
                            }
                        }
                );
    });
});
// application -------------------------------------------------------------
app.get('*.html', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
console.log(__dirname);