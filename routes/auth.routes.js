/**
 * Created by maartje on 13-6-2017.
 */
var express = require('express');
var routes = express.Router();
var auth = require('../auth/authentication');

routes.get('/login', function(request, response){
    var credentials = basic_auth(request);
    var email = credentials.name;
    var password = credentials.pass;


    // Validate the input
    if (validator.isEmail(email) && !validator.isEmpty(password)) {
        // Load hash from your password DB.
        db.query('SELECT * FROM customer WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (error) {
                // Error handling for select db query
                console.log(error);
                response.status(500);
                response.json({
                    'error': 'Something went wrong when querying the database, check stdout'
                })
            } else {
                if (results.length > 0) {
                    // Compare db hash and body hash
                    bcrypt.compare(password, results[0].hash, function (err, result) {
                        if (result) {
                            response.status(200);
                            response.json({
                                "token": auth.encodeToken(results[0].customer_id),
                                "email": email
                            });
                        } else {
                            // Hash comparing resulted in false
                            response.status(401);
                            response.json({
                                "error": "Invalid credentials"
                            });
                        }
                    });
                } else {
                    response.status(401);
                    response.json({
                        "error": "Invalid credentials"
                    });
                }
            }
        })
    } else {
        res.status(401);
        res.json({
            'error': 'Invalid credentials'
        })
    }
});

module.exports = routes;