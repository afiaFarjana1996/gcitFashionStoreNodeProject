var routes = require('express').Router();
var db = require('../dao/db');
var customerDao = require('../dao/customerDao');

routes.get('/customers/:userId',function(req,res){
    customerDao.getCustomer(req.params.userId,function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/customers', function(req, res){
  var customer = req.body;
  customerDao.addCustomer(customer, function(err, result){
    if(err){
      res.status(400);
      res.send(result);
    }
    res.status(201);
    res.send(result);
  });

});

routes.put('/customers/:userId', function(req, res){
    var customer = req.body;
    customer.userId = req.params.userId;
    customerDao.updateCustomer(customer, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send(result);
    });
  
  });

  routes.delete('/customers/:userId', function(req, res){
    customerDao.removeCustomer(req.params.userId, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send('customer deleted.');
    });
  });

module.exports = routes;