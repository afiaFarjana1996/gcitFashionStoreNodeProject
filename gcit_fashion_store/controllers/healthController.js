var routes = require('express').Router();

routes.get('/health', function (req, res, next){
    // optional: add further things to check (e.g. connecting to dababase)
    res.status(200);
    res.send('Healthy');
});

module.exports = routes;