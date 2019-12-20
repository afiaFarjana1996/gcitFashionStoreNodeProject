require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP
CONFIG.port         = process.env.PORT || 3000

  CONFIG.db_host      = process.env.DB_HOST
  CONFIG.db_user      = process.env.DB_USER
  CONFIG.db_password  = process.env.DB_PASSWORD

CONFIG.db_dialect   = 'mysql'
CONFIG.db_port      = '3306'
CONFIG.db_name      = process.env.DB_NAME

CONFIG.stripSecretKey = process.env.STRIPE_SECRET_KEY

CONFIG.awsAccessKey = process.env.AWSAccessKeyId
CONFIG.awsSecretKey = process.env.AWSSecretKey

//CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION
module.exports = CONFIG