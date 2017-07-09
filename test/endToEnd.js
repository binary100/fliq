const Nightmare = require('nightmare');
const expect = require('chai').expect;

const serverUrl = 'http://localhost:3000';

describe('FlickPick e2e Tests', function() { // Can't use arrow function
  this.timeout('25s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({ typeInterval: 20 });
  });

  describe('Front end interaction', () => {
    it('should find the header', (done) => {
      nightmare.goto(serverUrl)
        .wait(200)
        .visible('.header')
        .end()
        .then((isVisible) => {
          expect(isVisible).to.be.true;
          done();
        })
        .catch(done);
    });

    it('should click on a lightning tile', (done) => {
      nightmare.goto(serverUrl)
        .wait(200)
        .click('.start-lightning')
        .then(() => { done(); })
        .catch(done);
    });

    it('should return home from lightning', (done) => {
      nightmare.goto(serverUrl)
        .wait(200)
        .click('.start-lightning')
        .wait(200)
        .click('.link.home')
        .wait(200)
        .visible('.start-lightning')
        .then((isVisible) => {
          expect(isVisible).to.be.true;
          done();
        })
        .catch(done);
    });

    // Can't return DOM nodes out of evaluate function
    it('should find two lightning tiles', (done) => {
      nightmare.goto(serverUrl)
        .wait(200)
        .click('.start-lightning')
        .wait(500)
        .evaluate(() => document.querySelectorAll('.large-movie-tile').length) 
        .then((length) => {
          expect(length).to.equal(2);
          done();
        })
        .catch(done);
    });

    it('should find 5 small tiles on the results page', (done) => {
      nightmare.goto(serverUrl)
        .click('.start-lightning')
        .wait(200)
        .click('.large-movie-tile')
        .wait(200)
        .click('.large-movie-tile')
        .wait(200)
        .click('.large-movie-tile')
        .wait(200)
        .click('.large-movie-tile')
        .wait(200)
        .click('.large-movie-tile')
        .wait(200)
        .evaluate(() => {
          return document.querySelectorAll('.small-movie-tile').length;
        })
        .then((length) => {
          expect(length).to.equal(5);
        })
        .catch(done);
    });
  });
});

