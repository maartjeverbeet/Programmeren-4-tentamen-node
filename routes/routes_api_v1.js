/**
 * Created by joep on 13-06-17.
 */
// API version 1
var express = require('express');
var routes = express.Router();
var path = require('path');
var app = express();
var db = require('../config/db');

routes.post('/rentals/:customer_id/:inventory_id', function (request, response) {
    var rental = request.params;
    var query = {
        sql: 'INSERT INTO `rental`(rental_date, customer_id, inventory_id, staff_id) VALUES (?, ?, ?, ?)',
        values: [new Date(), rental.customer_id, rental.inventory_id, 1],
        timeout: 2000 //2secs
    };

    console.dir(rental);
    console.log('Onze query: ' + query.sql + query.values);

    response.contentType('application/json');
    db.query(query, function(error, rows, fields){
        if(error) {
            console.log(error);
            response.status(400);
            response.json(error);
        } else {
            response.status(200);
            response.json(rows);
        };
    });
});

routes.delete('/rentals/:customer_id/:inventory_id', function (request, response) {
    var rental = request.params;
    var query = {
        sql: 'DELETE FROM `rental` WHERE customer_id=? AND inventory_id=?' ,
        values: [ parseInt(rental.customer_id), parseInt(rental.inventory_id) ],
        timeout: 2000
    };

    console.log('Onze query: ' + query.sql);

    response.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error);
            response.status(400);
            response.json(error);
        } else {
            response.status(200);
            response.json(rows);
        };
    });
});

routes.get('/films/:film_id', function(request, response) {
    var film = request.params.film_id;

    response.contentType('application/json');

    db.query('SELECT * FROM film WHERE film_id=?', [ film ],
        function (error, rows, fields) {
            if (error) {
                response.status(400).json(error);
            } else {
                response.status(200).json(rows);
            };

        });

});

routes.post('/register', function (request, response) {

    var customer = request.body;

    var query = {
        sql: 'INSERT INTO `customer` (first_name, last_name, email) VALUES (?, ?, ?)',
        values: [ customer.first_name, customer.last_name, customer.email],
        timeout: 2000 //2secs
    };

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


routes.get('/rentals/:id', function(request, response) {
    var customerid = request.params.id;

    response.contentType('application/json');

    db.query('SELECT * FROM rental WHERE customer_id=?', [ customerid ],
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