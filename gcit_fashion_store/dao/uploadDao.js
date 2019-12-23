const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const CONFIG = require('../config');


aws.config.update({
    secretAccessKey: CONFIG.awsSecretKey,
    accessKeyId: CONFIG.awsAccessKey,
    region: 'us-east-2'
  });
  
  const s3 = new aws.S3();

//   const fileFilter = (req, file, cb) => {
//         cb(null, true);
//   }

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: CONFIG.bucketName,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_META_DATA!'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

  module.exports = upload;
  