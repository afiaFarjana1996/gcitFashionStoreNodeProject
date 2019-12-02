
var CONFIG = require('./config')

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Access-Control-Allow-Origin is a CORS (Cross-Origin Resource Sharing) header. When Site A tries to 
  // fetch content from Site B, Site B can send an Access-Control-Allow-Origin response header to tell 
  // the browser that the content of this page is accessible to certain origins.

  // The Access-Control-Allow-Headers response header is used in response to a preflight request which includes the Access-Control-Request-Headers
  //  to indicate which HTTP headers can be used during the actual request.

  // The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name.
  
// parse application/json
app.use(bodyParser.json());

const configureRoutes = require("./routes")

configureRoutes(app);

app.use(require('./controllers/productController'));

app.use(require('./controllers/categoryController'));

app.use(require('./controllers/customerController'));

app.use(require('./controllers/orderController'));

app.listen(3000);
console.log('Server running in port: 3000 ...')

