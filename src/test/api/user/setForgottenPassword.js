import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('PATCH /api/v1/forgot-password', function() {

  it('should call the password forgotten and reset the password', function(done) {
    api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: '111222333',
        newPassword: 'password2'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            grant_type: 'password',
            username: 'username2',
            password: 'password2'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return 404 if the token is not valid anymore', function(done){
    api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: '12345678',
        newPassword: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return 404 if there is no user with the given email', function(done) {
    api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: 'invalidtoken',
        newPassword: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return 400 if no resetToken was sent', function(done) {
    api
      .patch('/api/v1/forgot-password')
      .send({
        newPassword: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 if no newPassword was sent', function(done) {
    api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: 'invalidtoken'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

});