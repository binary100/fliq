const db = require('./database/dbsetup.js');

const trophiesArray = [
  [['Login1', 'Login10', 'Login50'], [1, 10, 50]],
  [['Like1', 'Like10', 'Like50'], [1, 10, 50]],
  [['Dislike1', 'Dislike10', 'Dislike50'], [1, 10, 50]],
  [['Lightning1', 'Lightning10', 'Lightning50', 'Lightning100'], [1, 10, 50, 100]],
  [['MovieNight1', 'MovieNight10'], [1, 10]],
  [['Seen1', 'Seen10', 'Seen50'], [1, 10, 50]],
  [['LaunchPad1'], [1]],
  [['TrophyHunter15', 'TrophyHunter32'], [15, 32]],
  [['Horror1', 'Horror10', 'Horror50'], [1, 10, 50]],
  [['Comedy1', 'Comedy10', 'Comedy50'], [1, 10, 50]],
  [['Drama1', 'Drama10', 'Drama50'], [1, 10, 50]],
  [['Action1', 'Action10', 'Action50'], [1, 10, 50]]
];

trophiesArray.forEach((trophy) => {
  db.trophies.create({
    trophyNames: trophy[0],
    targetNums: trophy[1]
  });
});
