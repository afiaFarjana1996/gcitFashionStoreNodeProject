var routes = require('express').Router();
var orderDetailsDao = require('../dao/orderDetailsDao');

routes.get('/orderDetails/:orderId',function(req,res){
  orderDetailsDao.getOrderDetails(req.params.orderId,function(error, result){
    if(error) throw error;
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(result);
  });
});

routes.get('/orderDetails',function(req,res){
  orderDetailsDao.getMostRecentOrder(function(error, result){
    if(error) throw error;
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.send(result);
  });
});

routes.post('/orderDetails', function(req, res){
  var order = req.body;
  orderDetailsDao.addOrderDetails(order, function(err, result){
    if(err){
      res.status(400);
      res.send(result);
    }
    res.status(201);
    res.send(result);
  });

});

routes.put('/orderDetails/orderId/:orderId/productId/:productId', function(req, res){
    var orderDetails = req.body;
    orderDetails.orderId = req.params.orderId;
    orderDetails.productId = req.params.productId;
    orderDetailsDao.updateOrderDetails(orderDetails, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send(result);
    });
  
  });

  routes.delete('/orderDetails/:orderId', function(req, res){
    orderDetailsDao.removeOrderDetails(req.params.orderId, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send('order Details deleted.');
    });
  });

module.exports = routes;