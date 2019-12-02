var routes = require('express').Router();
var db = require('../dao/db');
var productDao = require('../dao/productDao');

routes.get('/products',function(req,res){
    productDao.getAllProducts(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.get('/products/:categoryId',function(req,res){
  productDao.getProductByCategory(req.params.categoryId,function(error, result){
    if(error) throw error;
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  });
});

routes.post('/products', function(req, res){
  var product = req.body;
  productDao.addProduct(product, function(err, result){
    if(err){
      res.status(400);
      res.send(result);
    }
    res.status(201);
    res.send(result);
  });

});

routes.put('/products/:productId', function(req, res){
    var product = req.body;
    product.productId = req.params.productId;
    productDao.updateProduct(product, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send(result);
    });
  
  });

  routes.delete('/products/:productId', function(req, res){
    productDao.removeProduct(req.params.productId, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send('product deleted.');
    });
  });

module.exports = routes;