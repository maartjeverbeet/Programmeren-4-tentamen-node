/**
 * Created by maartje on 13-6-2017.
 */
var express = require('express');
var routes = express.Router();
var auth = require('../auth/authentication');

routes.post('/login', function(req, res){

    console.dir(req.body);

    var username = req.body.username;
    var password = req.body.password;

    if(username == "username" && password =="test") {
        var token = auth.encodeToken(username);
        res.contentType('application/json');
        res.status(200);
        res.json({token: token});
    } else {
        res.contentType('application/json');
        res.status(401);
        res.json({
            error: "ongeldige usernaam of password."
        });
    }
});

module.exports = routes;