var db = require('./db');


exports.getOrders= function(orderId,cb){
    db.query('select * from orders where orderId=?', [orderId] , function(err, result) {
        cb(err, result);
      });
      
};

exports.addOrder = function(orders , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into orders values(?,?,?,?,?)',[orders.orderId,orders.orderDate,orders.userId,orders.emploeeId,orders.creditCardId], function(err, result){
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

// exports.updateOrder = function(orders , cb){
//     db.beginTransaction(function(err){
//         if(err) cb(err, null);
    
//         db.query('update orders set unitPrice=?,quantity=?,taxes=? where orderId=? AND productId=?', [orders.unitPrice,orders.quantity,orders.taxes,orders.orderId,orders.productId], function(err, result){
//           if(err){
//             db.rollback(function(err, result){
//               cb(err, result);
//             });
//           } 
//           db.commit(function(err, result){
//             cb(err, result);
//           });
//         });
//       });
//   };

  exports.removeOrders = function(orderId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from orders where orderId=?', [orderId], function(err, result){
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