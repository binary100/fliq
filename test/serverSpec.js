const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../server.js');

const serverUrl = `http://localhost:3000`;

describe('FlickPick Server Tests', function() {

  describe('Server stability', function() {
    it('should respond to requests', function(done) {
      request(serverUrl)
        .get('')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
    it('should return index.html', function(done) {
      request(serverUrl)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.text).to.include('<div id="app"></div>');
          done();
        });
    });
  });

  describe('Api endpoints', function() {
    it('should respond with two movie objects', function(done) {
      request(serverUrl)
        .get('/api/lightning')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body).to.be.an('array');
          expect(res.body[0].poster).to.be.a('string');
          expect(res.body[1].poster).to.be.a('string');
          expect(res.body[0].director).to.be.a('string');
          expect(res.body[1].director).to.be.a('string');
          expect(res.body[0].title).to.be.a('string');
          expect(res.body[1].title).to.be.a('string');
          done();
        });
    });
    it('should respond with 200', function(done) {
      request(serverUrl)
        .post('/api/lightning')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });
    it('should provide five movie objects', function(done) {
      request(serverUrl)
        .get('/api/results/random')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body.movies).to.be.an('array');
          expect(res.body.movies.length).to.equal(5);
          for (var i = 0; i < 4; i += 1) {
            const movie = res.body.movies[i];
            expect(movie.poster).to.be.a('string');
            expect(movie.title).to.be.a('string');
            expect(movie.year).to.be.a('string');
            expect(movie.plot).to.be.a('string');
            expect(movie.director).to.be.a('string');
            expect(movie.actors).to.be.a('string');
            expect(movie.writer).to.be.a('string');
            expect(movie.rated).to.be.a('string');
            expect(movie.ratings).to.be.a('string');
            expect(movie.genre).to.be.a('string');
          }
          done();
        });
    });
  });

  describe('Auth endpoints', function() {
    it('should redirect to google oauth page', function(done) {
      request(serverUrl)
        .get('/auth/google')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.headers.location).to.include('accounts.google.com');
          done();
        });
    });

    it('should redirect to facebook oauth page', function(done) {
      request(serverUrl)
        .get('/auth/facebook')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.headers.location).to.include('www.facebook.com/dialog/oauth');
          done();
        });
    });
  });
});
