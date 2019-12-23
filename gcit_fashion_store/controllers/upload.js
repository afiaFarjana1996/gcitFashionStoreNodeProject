const upload = require('../dao/uploadDao');
var routes = require('express').Router();

const singleUpload = upload.single('file');
routes.post('/upload',function(req,res){
    singleUpload(req, res, function(err) {

        if (err) {
          return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
    
        return res.json({'file Location': req.file.location});
});
});
module.exports = routes;