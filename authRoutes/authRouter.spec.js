const request = require('supertest');

const db = require('../db/dbConfig.js');
const server = require('../index.js');

describe('server', () => {
    beforeEach(async () => {
      // guarantees that the table is cleaned out before any of the tests run
      await db('users').truncate();
    });

    // cross-env DB_ENV=testing
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST /api/auth/register', () => {
    it('should insert user into db', () => {
      // insert one
      return request(server)
        .post('/api/auth/register')
        .send({
         id: 5, username: "tester", password: "test"
        })
        .then(res => {
          console.log("BODY", res.body)
          expect(res.body.id).toBe(5);
        });
    });

     it('returns JSON', () => {
       return request(server)
         .post('/api/auth/register')
         .send({
          id: 5, username: "tester", password: "test"
         })
         .then(res => {
           // matching on regular expression
           expect(res.type).toMatch(/json/);
         });
     });
  });

  // cant get this to work
  describe('Delete User', () => {
    it('should delete a user from db', () => {
      // insert one
      return request(server)
        .post('/api/auth/register')
        .send({
         id: 5, username: "tester", password: "test"
        })
        .then(res => {
          request(server).delete('/api/5')
          .then(res => {

            expect(res).toBe(1);
          })
        })
        .catch( err => {
          console.log('heres my error:', err)
        });
    });
  });
  //    it('returns JSON', () => {
  //      return request(server)
  //        .post('/api/auth/register')
  //        .send({
  //         id: 5, username: "tester", password: "test"
  //        })
  //        .then(res => {
  //          // matching on regular expression
  //          expect(res.type).toMatch(/json/);
  //        });
  //    });
  // })