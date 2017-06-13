/**
 * Created by joep on 13-06-17.
 */
// API version 1
var express = require('express');
var routes = express.Router();
var path = require('path');
var app = express();
var db = require('../config/db');

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


routes.get('*', function(request, response) {
    response.status(404);
    response.json({
        "Error": "Page not found"
    });
});
module.exports = routes;


