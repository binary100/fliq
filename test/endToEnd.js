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
        .wait(1000)
        .click('.proceed-button')
        .wait(1000)
        .click('.large-movie-tile')
        .then(() => { done(); })
        .catch(done);
    });

    it('should return home from lightning rounds', (done) => {
      nightmare.goto(serverUrl)
        .wait(200)
        .click('.start-lightning')
        .wait(1000)
        .click('.proceed-button')
        .wait(1000)
        .click('a.home')
        .wait(500)
        .visible('.welcome')
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
        .wait(1000)
        .click('.proceed-button')
        .wait(1000)
        .evaluate(() => document.querySelectorAll('.large-movie-tile').length) 
        .then((length) => {
          expect(length).to.equal(2);
          done();
        })
        .catch(done);
    });

    xit('should find 6 small tiles on the results page', (done) => {
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
          expect(length).to.equal(6);
          done();
        })
        .catch(done);
    });
  });
});

