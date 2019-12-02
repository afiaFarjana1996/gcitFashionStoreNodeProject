var db = require('./db');

exports.getCustomer = function(userId,cb){
    db.query('select * from fashion_store.customers where userId=?', [userId] , function(err, result) {
        cb(err, result);
      });
};

exports.addCustomer = function(customer , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into customers(email,password,name,address,phone,registerDate,creditCardId) values(?,?,?,?,?,?,?)',[customer.email,customer.password,customer.name,customer.address,customer.phone,customer.registerDate,customer.creditCardId], function(err, result){
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

exports.updateCustomer = function(customer , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update customers set email=?,password=?,name=?,address=?,phone=?,registerDate=?,creditCardId=? where userId=?', [customer.email,customer.password,customer.name,customer.address,customer.phone,customer.registerDate,customer.creditCardId,customer.userId], function(err, result){
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

  exports.removeCustomer = function(userId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from customers where userId=?', [userId], function(err, result){
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