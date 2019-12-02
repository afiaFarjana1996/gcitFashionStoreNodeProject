var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from library.tbl_book', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book , cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into tbl_book(title,authId,pubId) values(?,?,?)', [book.title, book.authorId,book.publisherId], function(err, result){
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

exports.updateBook = function(book , cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('update tbl_book set title=?,authId=?,pubId=? where bookId=?', [book.title, book.authorId,book.publisherId,book.bookId], function(err, result){
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

exports.removeBook = function(bookId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from library.tbl_book where bookId = ?', [bookId], function(err, result){
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
}