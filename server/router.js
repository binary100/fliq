const router = require('express').Router();
const apiController = require('./apiController.js');

router.get('/api/lightning', apiController.getTwoMovies);
router.post('/api/lightning', apiController.chooseMovie);

module.exports = router;
