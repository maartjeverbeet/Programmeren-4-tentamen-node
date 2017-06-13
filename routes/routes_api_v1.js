/**
 * Created by joep on 13-06-17.
 */
// API version 1
var express = require('express');
var routes = express.Router();
var path = require('path');
var app = express();
var db = require('../config/db');

routes.post('/cities', function(request, response){
    console.log('test.');
    var city = request.body;
    console.log(city.name);
    var query = {
        sql: 'INSERT INTO `city` (Name, CountryCode, District, Population) VALUES (?, ?, ?, ?)',
        values: [ city.Name, city.CountryCode, city.District, city.Population],
        timeout: 2000 //2secs
    };

    console.dir(city);
    console.log('Onze query: ' + query.sql + query.values);

    response.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            response.status(400);
            response.json(error);
        } else {
            response.status(200);
            response.json(rows);
        };
    });
});

routes.put('/cities/:id', function(request, response){
    var city = request.city;
    var ID = request.params.id;
    var query = {
        sql: 'UPDATE `city` SET Name=?, CountryCode=?, District=?, Population=? WHERE ID=?',
        values: [ city.Name, city.CountryCode, city.District, city.Population ],
        timeout: 2000
    };

    console.dir(city);
    console.log('Onze query: ' + query.sql);

    response.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if(error) {
            response.satus(400);
            response.json(error);
        } else {
            response.satus(200);
            response.json(rows);
        };
    });
});

routes.delete('/actors/:id', function(require, response) {
    var ID = require.params.id;
    var query = {
        sql: 'DELETE FROM `city` WHERE ID=?',
        values: [ ID ],
        timeout: 2000
    };

    console.log('Onze query: ' + query.sql);

    response.contentType('application/json');
    db.query(query, function(error, rows, fields){
        if(error) {
            response.status(400);
            response.json(error);
        } else {
            response.satus(200);
            response.json(rows);
        };
    });
});

routes.get('/cities', function (req, res) {
    res.contentType('application/json')
    db.query('SELECT * FROM city', function(error, rows, fields) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        };
    });
});

routes.get('/cities/:id', function(request, response) {
    var cityId = request.params.id;

    response.contentType('application/json');

    db.query('SELECT * FROM city WHERE city_ID=?', [ cityId ],
        function (error, rows, fields) {
            if (error) {
                response.status(400).json(error);
            } else {
                response.status(200).json(rows);
            };

        });

});


routes.get('*', function(request, response) {
    response.status(404);
    response.json({
        "Error": "Page not found"
    });
});
module.exports = routes;


