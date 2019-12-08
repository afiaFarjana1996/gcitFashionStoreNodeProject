require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP
CONFIG.port         = process.env.PORT || 3000

if(process.env.NODE_ENV == 'TEST'){
  CONFIG.db_dialect   = 'mysql'
  CONFIG.db_host      = '127.0.0.1'
  CONFIG.db_user      = 'root'
  CONFIG.db_password  = 'smoothstack'
}
else{
  CONFIG.db_dialect   = process.env.DB_DIALECT
  CONFIG.db_host      = process.env.DB_HOST
  CONFIG.db_user      = process.env.DB_USER
  CONFIG.db_password  = process.env.DB_PASSWORD
}

CONFIG.db_port      = process.env.DB_PORT
CONFIG.db_name      = process.env.DB_NAME

CONFIG.stripSecretKey = process.env.STRIPE_SECRET_KEY


//CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION
module.exports = CONFIG