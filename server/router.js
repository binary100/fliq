const router = require('express').Router();
const passport = require('passport');
const apiController = require('./apiController.js');
const searchLikeDislikeEndpoints = ['/api/search/movie/like', '/api/search/movie/dislike'];
const resultsLikeDislikeEndpoints = ['/api/results/movie/like', '/api/results/movie/dislike'];

router.get('/api/lightning', apiController.getTwoMovies);
router.post('/api/lightning', apiController.handleLightningSelection);
router.get('/api/results', apiController.getUserResults);
router.get('/api/quote', apiController.getQuote);
router.post('/api/trailer', apiController.getTrailer);
router.get('/api/tagCreation', apiController.populateTags);
router.post('/api/search', apiController.handleMovieSearchOMDB);
router.post('/api/autocomplete', apiController.getSearchAutoComplete);
router.post('/api/search/movie/seen', apiController.setSearchedMovieAsSeen);
router.post(searchLikeDislikeEndpoints, apiController.handleLikeOrDislikeFromSearch);
router.post('/api/results/movie/seen', apiController.setResultsMovieAsSeen);
router.post(resultsLikeDislikeEndpoints, apiController.handleLikeOrDislikeFromResults);
router.post('/api/movie/select', apiController.getLargeTileData);
router.post('/api/user/email/verify', apiController.verifyUserEmail);
router.post('/api/movienight', apiController.getMovieNightResults);
router.get('/api/lightning/testUserTags', apiController.findDuplicateTagIDs);
router.get('/api/tags', apiController.getTagsforLaunchPad);
router.post('/api/selectedTags', apiController.postLaunchPadTags);

// router.get('/api/dashboard/', apiController.)

router.post('/api/dashboard/initialUserSettings', apiController.getUserInfo);
router.post('/api/dashboard/updateUserSettings', apiController.updateUserSettings);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_likes'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000/#');
  });
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/checkSession', apiController.checkSession, (req, res) => {
  res.status(200).json({ status: 'Login successful!' });
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
