const axios = require('axios');

const arr = JSON.parse(`["The Shawshank Redemption","The Godfather","The Godfather: Part II","The Dark Knight","12 Angry Men","Schindler's List","Pulp Fiction","The Lord of the Rings: The Return of the King","The Good, the Bad and the Ugly","Fight Club","The Lord of the Rings: The Fellowship of the Ring","Forrest Gump","Star Wars: Episode V - The Empire Strikes Back","Inception","The Lord of the Rings: The Two Towers","One Flew Over the Cuckoo's Nest","Goodfellas","The Matrix","Seven Samurai","Star Wars: Episode IV - A New Hope","City of God","Se7en","The Silence of the Lambs","It's a Wonderful Life","Life Is Beautiful","The Usual Suspects","Léon: The Professional","Saving Private Ryan","Spirited Away","Once Upon a Time in the West","American History X","Interstellar","Psycho","Casablanca","City Lights","The Green Mile","The Intouchables","Modern Times","Raiders of the Lost Ark","Rear Window","The Pianist","The Departed","Terminator 2: Judgment Day","Back to the Future","Whiplash","Gladiator","Memento","The Prestige","The Lion King","Apocalypse Now","Alien","Sunset Boulevard","Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb","The Great Dictator","Cinema Paradiso","The Lives of Others","Grave of the Fireflies","Paths of Glory","Django Unchained","The Shining","WALL·E","American Beauty","The Dark Knight Rises","Princess Mononoke","Aliens","Oldboy","Once Upon a Time in America","Witness for the Prosecution","Das Boot","Citizen Kane","Dangal","Vertigo","North by Northwest","Star Wars: Episode VI - Return of the Jedi","Reservoir Dogs","Braveheart","M","Requiem for a Dream","Amélie","Like Stars on Earth","A Clockwork Orange","Lawrence of Arabia","Taxi Driver","Double Indemnity","Eternal Sunshine of the Spotless Mind","Amadeus","To Kill a Mockingbird","Toy Story 3","Full Metal Jacket","2001: A Space Odyssey","Singin' in the Rain","The Sting","Your Name","Toy Story","Bicycle Thieves","The Kid","Inglourious Basterds","3 Idiots","Snatch","Monty Python and the Holy Grail","L.A. Confidential","For a Few Dollars More","The Hunt","Scarface","Good Will Hunting","My Father and My Son","The Apartment","Rashomon","A Separation","Metropolis","Indiana Jones and the Last Crusade","All About Eve","Yojimbo","Batman Begins","Up","Some Like It Hot","The Treasure of the Sierra Madre","Unforgiven","Downfall","Raging Bull","Die Hard","Children of Heaven","The Third Man","Heat","The Great Escape","Chinatown","Baby Driver","Ikiru","Pan's Labyrinth","My Neighbor Totoro","Inside Out","Ran","The Gold Rush","The Secret in Their Eyes","On the Waterfront","La La Land","Room","The Bridge on the River Kwai","Howl's Moving Castle","Blade Runner","Incendies","Judgment at Nuremberg","The Seventh Seal","Lock, Stock and Two Smoking Barrels","Mr. Smith Goes to Washington","Logan","Casino","A Beautiful Mind","The Elephant Man","Andrei Rublev","Wild Strawberries","V for Vendetta","The General","The Wolf of Wall Street","Warrior","The Bandit","Trainspotting","Sunrise","Dial M for Murder","Gran Torino","The Deer Hunter","Hacksaw Ridge","Gone with the Wind","Fargo","The Big Lebowski","The Sixth Sense","The Thing","Finding Nemo","Tokyo Story","No Country for Old Men","Rang De Basanti","The Passion of Joan of Arc","Cool Hand Luke","Rebecca","A Wednesday","There Will Be Blood","How to Train Your Dragon","Kill Bill: Vol. 1","Come and See","Mary and Max","Gone Girl","Into the Wild","It Happened One Night","Shutter Island","Life of Brian","Platoon","Wild Tales","Hotel Rwanda","Rush","The Wages of Fear","Network","In the Name of the Father","Stand by Me","The 400 Blows","Ben-Hur","The Grand Budapest Hotel","Mad Max: Fury Road","Spotlight","12 Years a Slave","Persona","Million Dollar Baby","Butch Cassidy and the Sundance Kid","Jurassic Park","Memories of Murder","Amores Perros","Munna Bhai M.B.B.S.","The Maltese Falcon","Stalker","The Nights of Cabiria","The Truman Show","Hachi: A Dog's Tale","The Princess Bride","Nausicaä of the Valley of the Wind","Before Sunrise","Star Wars: The Force Awakens","Sholay","The Grapes of Wrath","Harry Potter and the Deathly Hallows: Part 2","Rocky","Prisoners","Touch of Evil","Gandhi","Diabolique","Annie Hall","Catch Me If You Can","Donnie Darko","Monsters, Inc.","Hera Pheri","The Bourne Ultimatum","The Terminator","8½","The Wizard of Oz","Barry Lyndon","Groundhog Day","La Haine","Twelve Monkeys","Jaws","Infernal Affairs","The Best Years of Our Lives","Gangs of Wasseypur","The Help","Beauty and the Beast","The Battle of Algiers","Dog Day Afternoon","In the Mood for Love","Pirates of the Caribbean: The Curse of the Black Pearl","What Ever Happened to Baby Jane?","PK","Paris, Texas","Queen"]`);
const omdbUrl = `http://www.omdbapi.com/?apikey=d21b88c2&t=`;
const regex = /[^a-zA-Z0-9]+/g;
const db = require('./database/dbsetup.js');

// db.movies.sync({ force: true });

const apiRequests = arr.splice(0, 5).map(title => {
  const url = `${omdbUrl}${title.replace(regex, '+')}`;
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((results) => resolve(results.data))
      .catch((error) => reject(error));
  });
});

console.log(apiRequests);

Promise.all(apiRequests)
  .then((results) => {
    const movieModels = results.map((obj) => {
      const newObj = Object.assign({}, obj, { Ratings: JSON.stringify(obj.Ratings) });
      return newObj;
    });

    movieModels.forEach((movie) => {
      if (movie.Title) {
        db.movies.create({
          title: movie.Title,
          year: movie.Year,
          rated: movie.Rated,
          genre: movie.Genre,
          plot: movie.Plot,
          ratings: movie.Ratings,
          poster: movie.Poster,
          director: movie.Director,
          writer: movie.Writer,
          actors: movie.Actors
        });
      }
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  }
);
