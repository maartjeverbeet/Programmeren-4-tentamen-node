var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var config = require('./config/config');
var db = require('./config/db');
var auth_routes = require('./routes/auth.routes');
var routes_v1 = require('./routes/routes_api_v1');
var expressJWT = require('express-jwt');

var app = express();
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: [
        { url: '/api/v1/film', methods: ['GET'] },
        { url: /^\/api\/v1\/films\/.*/, methods: ['GET'] },
        { url: '/api/v1/login', methods: ['POST'] },
        { url: '/api/v1/register', methods: ['POST'] },
        { url: '/api/v1/login', methodes: ['GET'] }
    ]
}));

app.set('port', (process.env.PORT || config.webPort));
app.set('env', (process.env.ENV || 'development'));

app.use(logger('dev'));

//app.all('*', function(request, response, next) {
  //  console.log(request.method + " " + request.url);
    //next();
//});

app.use('/api/v1', routes_v1);
app.use('/api/v1', auth_routes);

app.use(function (err, req, res, next) {
    console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

app.use('*', function(req, res){
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('De server luistert op port ' + app.get('port'));
});

module.exports = app;