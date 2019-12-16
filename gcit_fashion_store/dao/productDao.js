var db = require('./db');

exports.getAllProducts = function(cb){
    db.query('select * from products', function(err, result) {
        cb(err, result);
      });
};

exports.getProductByCategory = function(categoryId, cb){
  db.query('select * from products where categoryId=?',[categoryId], function(err, result) {
    cb(err, result);
  });
};

exports.addProduct = function(product , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        db.query('insert into products(brand,name,categoryId,price,quantity) values(?,?,?,?,?)',[product.brand,product.name,product.categoryId,product.price,product.quantity], function(err, result){
          if(err){
            db.rollback(function(err){
              cb(err, result);
            });
          } 
          db.commit(function(err){
            cb(err, result);
          });
        });
      });
};

exports.updateProduct = function(product , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update products set brand=?,name=?,categoryId=?,price=?,quantity=? where productId=?', [product.brand,product.name,product.categoryId,product.price,product.quantity,product.productId], function(err, result){
          if(err){
            db.rollback(function(err, result){
              cb(err, result);
            });
          } 
          db.commit(function(err, result){
            cb(err, result);
          });
        });
      });
  };

  exports.removeProduct = function(productId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from products where productId=?', [productId], function(err, result){
          if(err){
            db.rollback(function(err, result){
              cb(err, result);
            });
          } 
          db.commit(function(err, result){
            cb(err, result);
          });
        });
      });
  };