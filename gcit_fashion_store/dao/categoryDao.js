var db = require('./db');

exports.getAllCategory = function(cb){
    db.query('select * from fashion_store.categories', function(err, result) {
        cb(err, result);
      });
};

exports.addCategory = function(category , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into categories(name,description) values(?,?)',[category.name, category.description], function(err, result){
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

exports.updateCategory = function(category , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('update categories set name=?,description=? where categoryId=?', [category.name, category.description, category.categoryId], function(err, result){
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

  exports.removeCategory = function(categoryId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from categories where categoryId=?', [categoryId], function(err, result){
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