var routes = require('express').Router();
var db = require('../dao/db');
var categoryDao = require('../dao/categoryDao');

routes.get('/categories',function(req,res){
    categoryDao.getAllCategory(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/categories', function(req, res){
  var category = req.body;
  categoryDao.addCategory(category, function(err, result){
    if(err){
      res.status(400);
      res.send(result);
    }
    res.status(201);
    res.send(result);
  });

});

routes.put('/categories/:categoryId', function(req, res){
    var category = req.body;
    category.categoryId = req.params.categoryId;
    categoryDao.updateCategory(category, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send(result);
    });
  
  });

  routes.delete('/categories/:categoryId', function(req, res){
    categoryDao.removeCategory(req.params.categoryId, function(err, result){
      if(err){
        res.status(400);
        res.send(result);
      }
      res.status(200);
      res.send('category deleted.');
    });
  });

module.exports = routes;