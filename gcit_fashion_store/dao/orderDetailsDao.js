var db = require('./db');

exports.getOrderDetails = function(orderId,cb){
  db.query('select * from orderDetails where orderId=?', [orderId] , function(err, result) {
      cb(err, result);
    });
    
};

exports.getMostRecentOrder = function(cb){
  db.query('select * from orderDetails where orderId= (select max(orderId) from orderDetails)' , function(err, result) {
    cb(err, result);
  });
};

exports.addOrderDetails = function(orderDetailsArray , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        Array.prototype.forEach.call(orderDetailsArray,orderDetails => {
        db.query('insert into orderDetails values(?,?,?,?,?)',[orderDetails.orderId,orderDetails.productId,orderDetails.price,orderDetails.orderedQuantity,orderDetails.taxes], function(err, result){
          if(err){
            db.rollback(function(err){
              cb(err);
            });
          } 
          db.commit(function(err){
            cb(err);
          });
        });
        var quantity = orderDetails.quantity - orderDetails.orderedQuantity;
        db.query('update products set quantity=? where productId=?',[quantity,orderDetails.productId],function(err, result){
          if(err){
            db.rollback(function(err){
              cb(err);
            });
          } 
          db.commit(function(err){
            cb(err);
          });
        });
      });
      });
};



exports.updateOrderDetails = function(orderDetails , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update orderDetails set unitPrice=?,quantity=?,taxes=? where orderId=? AND productId=?', [orderDetails.unitPrice,orderDetails.quantity,orderDetails.taxes,orderDetails.orderId,orderDetails.productId], function(err, result){
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

  exports.removeOrderDetails = function(orderId, productId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from orderDetails where orderId=? AND productId=?', [orderId,productId], function(err, result){
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