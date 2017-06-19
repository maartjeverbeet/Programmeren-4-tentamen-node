/**
 * Created by maartje on 13-6-2017.
 */
var express = require('express');
var routes = express.Router();
var auth = require('../auth/authentication');

routes.get('/login', function(request, response){
    var credentials = basic_auth(request);
    var email = credentials.name;
    var password_user = credentials.pass;

    if (validator.isEmail(email) && !validator.isEmpty(password_user)) {
        // Load hash from your password DB.
        db.query('SELECT * FROM customer WHERE email = ? AND password_user = ?', [email, password_user], function (error, results, fields) {
            if (error) {
                // Error handling for select db query
                console.log(error);
                response.status(500);
                response.json({
                    'error': 'Something went wrong when querying the database, check stdout'
                })
            } else {
                if (results.length > 0) {
                    var token = auth.encodeToken(username);
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
    } else {
        response.status(401);
        response.json({
            'error': 'Invalid credentials'
        })
    }
});

module.exports = routes;