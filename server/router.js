const router = require('express').Router();
const passport = require('passport');
const apiController = require('./apiController.js');
const searchLikeDislikeEndpoints = ['/api/search/movie/like', '/api/search/movie/dislike'];
const resultsLikeDislikeEndpoints = ['/api/results/movie/like', '/api/results/movie/dislike'];

router.get('/api/lightning', apiController.getTwoMovies);
router.post('/api/lightning', apiController.handleLightningSelection);
router.get('/api/results/user', apiController.getSmartUserResults);
router.get('/api/results/top', apiController.getTopResults);
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
router.post('/api/user/watched', apiController.setUserWatchedMovie);
router.post('/api/movienight', apiController.getMovieNightResults);
router.get('/api/lightning/testUserTags', apiController.findDuplicateTagIDs);

router.get('/api/tags', apiController.getTagsforLaunchPad);
router.post('/api/selectedTags', apiController.postLaunchPadTags);

router.post('/api/dashboard/userInfo', apiController.getUserInfo);
router.post('/api/dashboard/updateUserSettings', apiController.updateUserSettings);
router.get('/api/dashboard/tableData', apiController.getTableData);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_likes'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user._previousDataValues.loginNumber === 0) {
      res.redirect('/#/launchPad');
    } else {
      res.redirect('http://localhost:3000/#');
      // res.redirect('/');
    }
  });
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    if (req.user._previousDataValues.loginNumber === 0) {
      res.redirect('/#/launchPad');
    } else {
      res.redirect('/');
    }
  });

router.get('/checkSession', apiController.checkSession, (req, res) => {
  res.status(200).json({ status: 'Login successful!' });
});

router.get('/api/testme', (req, res) => {

  const userAndTrophyObj = {
    user: {
      id: 2,
      name: 'Rob Cornell'
    },
    trophy: ['Login1']
  };
  apiController.getUserInfo(req, res);
  // apiController.trophyHunter(userAndTrophyObj)
  // .then(val => res.send(val));
  // apiController.createTrophiesAndReturnUser(req, res);
  // apiController.createTrophiesAndReturnUser(req, res)
  //   .then(() => apiController.setUserWatchedMovieToNull(req.user));
});

router.get('/account', (req, res) => {
  if (req.isAuthenticated()) {

    apiController.createTrophiesAndReturnUser(req, res)
    .then(() => apiController.setUserWatchedMovieToNull(req.user));
    // res.send({ user: req.user });
    // apiController.setUserWatchedMovieToNull(req.user);
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
