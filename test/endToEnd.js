const Nightmare = require('nightmare');
const assert = require('chai').assert;
const expect = require('chai').expect;

const serverUrl = `http://localhost:3000`;

describe('FlickPick e2e Tests', function() {
  this.timeout('25s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({ typeInterval: 20 });
  });

  describe('Front end interaction', function() {
    it('should find the header', function(done) {
      nightmare.goto(serverUrl)
        .wait(200)
        .visible('.header')
        .end()
        .then((result) => {
          expect(result).to.be.true;
          done();
        })
        .catch(done);
    });
  });
});

