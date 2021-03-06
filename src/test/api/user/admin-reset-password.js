import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('PATCH /api/v1/users/{user_id}/change-password', function() {

  it('should return 403 for an user account (not admin)', function() {
    return api
      .patch('/api/v1/users/10003/change-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        newPassword: 'password'
      })
      .catch(function(res) {
        expect(res.status).to.equal(403);
      });
  });

  it('should not allow to reset another admins password', function() {
    return api
      .patch('/api/v1/users/10004/change-password')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({
        newPassword: 'password'
      })
      .catch(function(res) {
        expect(res.status).to.equal(403);
      });
  });

  it('should change the password of user3 and login successfully with the new password', function() {
    return api
      .patch('/api/v1/users/10003/change-password')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({
        newPassword: 'password3'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            password: 'password', // old password
            username: 'username2',
            grant_type: 'password'
          });
      })
      .catch(function(res) {
        // old password should result in an invalid login
        expect(res.status).to.equal(401);
        return api
          .post('/api/v1/auth/token')
          .send({
            password: 'password3', // old password
            username: 'username2',
            grant_type: 'password'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
      });
  });

  it('should return 400 for a too short password', function() {
    return api
      .patch('/api/v1/users/10003/change-password')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({
        newPassword: 'pass'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should return 400 if no new password was sent', function() {
    return api
      .patch('/api/v1/users/10003/change-password')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({ })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

});
