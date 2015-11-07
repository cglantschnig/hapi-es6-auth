import supertest from 'supertest';
import should from 'should';
import { ready } from '../api/api.js';

// This agent refers to PORT where program is runninng.

var api = supertest.agent('http://localhost:3000');
var server;

/**
 * will get called by mocha before all tests start to run.
 * this function must make sure that the server started before the tests can run
 */
before(function(done) {
  this.timeout(0); // disable the timeout, the server startup takes as long as it needs
  ready
    .then(function(_server) {
      server = _server;
      done();
    });
});

/**
 * after all tests have been run, we need to stop the server
 */
after(function(done) {
  // just stop the server if the server started successfully
  if (server && server.stop) {
    server.stop({ timeout: 1000 }, done);
  }
});

// UNIT test begin

describe('Basic Tests',function() {

  // #1 should return home page

  it('should create a user',function(done){

    // calling home page api
    api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password',
        username: 'test'
      })
      .expect('Content-type',/json/)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

});
