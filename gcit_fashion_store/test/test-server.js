var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../main');
var should = chai.should();

chai.use(chaiHttp);

describe('Test Product', function() {
    it('should list ALL products on /products GET',function(done){
        chai.request(server)
        .get('/products')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
    it('should list a products based on category on /products/{id} GET',function(done){
        chai.request(server)

        .get('/products/' + '1')

        .end(function (err, res) {

            res.should.have.status(200);

            res.should.be.json;

            res.body.should.be.a('array');

            res.body.should.have.property('productId');
            res.body.should.have.property('brand');
            res.body.should.have.property('name');
            res.body.should.have.property('categoryId');
            res.body.should.have.property('price');
            res.body.should.have.property('quantity');

            done();

        });
    });
    it('should add a product on /products POST',function(done){
        chai.request(server)
        .post('/products')
        .send({
        "brand": "Greg Norman",
        "name": "Men's Long-sleeve Polo",
        "categoryId": 1,
        "price": 30.5,
        "quantity": 10 })

        .end(function (err, res) {
            res.should.have.status(201);
            done();
        });
    });
    it('should update a product blob on /products/<productId> PUT',function(done){
        chai.request(server)
        .put('/products/')
        .set({ 'productId': '8', 'Content-Type': 'application/json', 'Accept': 'application/json' })
        .send({
        "brand": "Greg Norman",
        "name": "Men's Long-sleeve Polo",
        "categoryId": 1,
        "price": 34.5,
        "quantity": 15 })

        .end(function (error, response) {
            if (error) {
                console.log("error");
                done(error);
            }
            else {
                response.should.have.status(200);
                done();
            }
        });
    });
    it('should delete a single products on /products/<productId> DELETE',function(done){
        chai.request(server)

        .delete('/products/')
        .set({ 'productId': '8', 'Content-Type': 'application/json', 'Accept': 'application/json' })
        .end(function (error, response) {
            if (error) {
                console.log("error");
                done(error);
            }
            else {
                response.should.have.status(200);
                done();
            }
        });

});
    });
  
  