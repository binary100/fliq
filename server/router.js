const router = require('express').Router();
const passport = require('passport');
const apiController = require('./apiController.js');

router.get('/api/lightning', apiController.getTwoMovies);
router.post('/api/lightning', apiController.handleLightningSelection);
router.get('/api/results', apiController.getUserResults);
router.get('/api/quote', apiController.getQuote);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/account', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get('/logout', (req, res) => {
  // Session.destroy({ where: { sid: req.sessionID } });
  req.logout();
  res.end();
});

module.exports = router;
