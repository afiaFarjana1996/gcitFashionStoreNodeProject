var db = require('./db');
var sha1 = require('sha1');
const bcrypt = require('bcrypt');

exports.getCustomer = function(userId,cb){
    db.query('select * from fashion_store.customers where userId=?', [userId] , function(err, result) {
        cb(err, result);
      });
};

exports.addCustomer = function(customer , cb){
  console.log("hit dao method.");
    db.beginTransaction(function(err){
      
        if(err) cb(err, null);
        bcrypt.hash(customer.password, 10, function(err, hash) {
          console.log("inside bcrypt.hash method");
        db.query('insert into customers(email,password,name,address,phone,registerDate,creditCardId) values(?,?,?,?,?,?,?)',[customer.email,hash,customer.name,customer.address,customer.phone,customer.registerDate,customer.creditCardId], function(err, result){
          console.log("inside db query");
          if(err){
            console.log("error: "+err);
            db.rollback(function(err){
              cb(err, result);
            });
          } 
          db.commit(function(err){
            console.log("hit commit method.");
            cb(err, result);
          });
        });
      });
    });
};

exports.loginCustomer = function(loginCredential, cb){
   db.beginTransaction(function(err){
     if(err) cb(err,null);
     var email = loginCredential.email;
     var userPassword = loginCredential.password;
     var message = '';
     // var session = loginCredential.session;
     
     db.query('SELECT * FROM customers where email=?',[email],function(err,result){
        if(err) {
          message = 'User Not Found';
          console.log(error);
          cb(err,message);
          return;
        }
        if(result.length != 0 ){
          var originalPassword = result[0].password;
        bcrypt.compare(userPassword, originalPassword, function(err, isMatch) {
          if (err) {
            throw err
          } else if (!isMatch) {
         
            message = 'Wrong Credentials';
            cb(err,message);
 
          } else {
          //loginCredential.session.userId = result[0].userId;
            cb(err,result);
          }
        });
        } else{
          message = 'User Not Found';
          console.log("result.length is 0");
          cb(err,message);

        }
      
     })
   });
}

exports.updateCustomer = function(customer , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update customers set email=?,password=?,name=?,address=?,phone=?,registerDate=?,creditCardId=? where userId=?', [customer.email,sha1(customer.password),customer.name,customer.address,customer.phone,customer.registerDate,customer.creditCardId,customer.userId], function(err, result){
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