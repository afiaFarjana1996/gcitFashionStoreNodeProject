var routes = require('express').Router();
var orderDao = require('../dao/orderDao');

routes.get('/orders/:orderId',function(req,res){
    orderDao.getOrders(req.params.orderId,function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/orders', function(req, res){
  var order = req.body;
  orderDao.addOrder(order, function(err, result){
    if(err){
      res.status(400);
      res.send(result);
    }
    res.status(201);
    res.send(result);
  });

});

// routes.put('/orders/:orderId', function(req, res){
//     var order = req.body;
//     order.orderId = req.params.orderId;
//     orderDao.updateOrder(order, function(err, result){
//       if(err){
//         res.status(400);
//         res.send(result);
//       }
//       res.status(200);
//       res.send(result);
//     });
  
//   });

  routes.delete('/orders/:orderId', function(req, res){
    orderDao.removeOrders(req.params.orderId, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send('order deleted.');
    });
  });

module.exports = routes;