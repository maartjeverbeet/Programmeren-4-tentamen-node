/**
 * Created by maartje on 13-6-2017.
 */
var express = require('express');
var routes = express.Router();
var auth = require('../auth/authentication');
var db = require('../config/db');

routes.post('/login', function(request, response){
    var email = request.body.name;
    var password_user = request.body.password_user;

    db.query('SELECT * FROM customer WHERE email = ? AND password_user = ?', [email, password_user], function (error, results, fields) {
        if (error) {
            // Error handling for select db query
            console.log(error);
            response.status(500);
            response.json({
                'error': 'Something went wrong when querying the database, check stdout'
            })
        } else {
            console.log("Results: "+ email + " " + password_user);
            console.log("Results: "+ results);
            if (results.length > 0) {
                var token = auth.encodeToken(email);
                response.status(200);
                response.json({
                    "token": token,
                });
            } else {
                response.status(401);
                response.json({
                    "error": "Invalid credentials"
                });
            }
        }
    })
});

module.exports = routes;