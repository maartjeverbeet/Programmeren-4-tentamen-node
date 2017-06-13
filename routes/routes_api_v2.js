/**
 * Created by maartje on 13-6-2017.
 */
// API version 2
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

router.get('/info', function(request, response) {
    response.status(200);
    response.json({
        "description": "Deze server is bedoeld voor practicum 2 van programmeren"
    });
});

router.get('*', function(request, response) {
    response.status(404);
    response.json({
        "Error": "Page not found"
    });
});

module.exports = router;
