![FLIQ](public/assets/fliqonwhite.jpg)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Travis](https://img.shields.io/travis/binary100/fliq.svg)]()

# FLIQ

> FLIQ is a learning engine-driven website for finding movies to watch. It uses a proprietary algorithm for building and evaluating user preferences based on what users tell FLIQ about what movies they like (or don't like). 

## Table of Contents

1. [Team](#team)
1. [Getting Started](#getting-started)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Contributing](#contributing)

## Team

> FLIQ is being developed by four super awesome full-stack engineers.

  - __Product Owner__: [David Earle](https://github.com/dearle)
  - __Scrum Master__: [Rob Cornell](https://github.com/rcornell)
  - __Development Team Members__: [Tae Lee](https://github.com/ta3woon), [Andrew Shih](https://github.com/ACS207)

## Getting Started

Follow these instructions if you want to fork the repo and start developing on your own. You do not need to follow these steps if you want to use our deployed build of [FLIQ](fliq.us-east-2.elasticbeanstalk.com).

### Prerequisites & Installing

1. Fork the repo and clone it to your development environment of choice.

2. To install FLIQ's dependencies, run the following command from the cloned repo's directory: 

```npm install```

### Configuration

You will need several API Keys to run your own build of FLIQ. We use the NPM package [dotenv](https://github.com/motdotla/dotenv) for our local environment variables. You should make a .env file, placed in your clone's root directory, that looks like this:

```
DB_USERNAME=(Your mysql db username)
DB_PASSWORD=(Your mysql db password)
DB_NAME=(Your mysql db name)
DB_PORT=(Your mysql db port)
DB_URL=(Your mysql db's URL)
PORT=(The port your build will run on)
GOOGLE_CLIENT_ID = (Google oauth client ID) // Available from [Google](https://console.developers.google.com)
GOOGLE_CLIENT_SECRET = (Google oauth client secret) Available from [Google](https://console.developers.google.com)
OMDB_API_KEY = (Your omdbapi key) // Available for a small fee from [OMDBAPI](http://www.omdbapi.com/)
FACEBOOK_APP_ID = (Facebook oauth APP ID) // Available from [Facebook](https://developers.facebook.com/)
FACEBOOK_APP_SECRET = (Facebook oauth app secret) // Available from [Facebook](https://developers.facebook.com/)
QUOTE_API_KEY = (Your quote API key) // Available from [Mashape](https://market.mashape.com/andruxnet/random-famous-quotes)
YOUTUBE_API_KEY= (Youtube Data API key) // Available from [Google](https://console.developers.google.com)
FACEBOOK_OAUTH_CALLBACK_URL = (Your facebook oauth callback url) // Available from [Facebook](https://developers.facebook.com/)
GOOGLE_OAUTH_CALLBACK_URL = (Your oauth callback url) Available from [Google](https://console.developers.google.com)
```

Keep in mind that your database's environment variable requirements may be different. FLIQ is set up to use Sequelize with mysql.

## Usage

![Splash](public/assets/img/welcome.png)

### Login

FLIQ needs to track your profile in order to learn about you, so start by logging in using either Google or Facebook. After that, start picking movies to teach our learning engine about what kind of movies you like (or don't like). If you want to tell FLIQ about specific movies you like or dislike, use the search function to pick out specific movies. When you want suggestions from the learning engine, click through to the results page.

Once you've built a profile for yourself, you can click through to the Dashboard (through the hamburger menu) and see a visualization of your preferences. You can also view any trophies you may have earned while using the site.

If you want to watch movies with a group of people, you can use the Movie Night feature. To use Movie Night, enter the e-mail addresses of other registered FLIQ users, the learning engine will do its best to aggregate everyone's preferences and pick movies for you to see.

Users that ask FLIQ for suggestions without being logged in will be shown the entire userbase's favorite movies based on all aggregated preferences. You can pick movies in the lightning round, but these selections will not be tracked.

Contact us if you have any questions!

## Built With

* [React](https://facebook.github.io/react/) - Facebook's powerful JavaScript framework
* [Redux](http://redux.js.org/) - Efficient state manager for web applications
* [Node.js](https://nodejs.org) - JavaScript runtime
* [Express](https://expressjs.com/)- Fantastic Node.js web server framework
* [Passport](http://passportjs.org/) - Library for various authentication strategies in Node.js
* [MySQL](https://www.postgresql.org/) - Object-relational database
* [Sequelize](www.sequelizejs.com) - Powerful ORM tool for SQL databases
* [SASS](http://sass-lang.com/) - Extension of CSS
* [Chart.js](http://www.chartjs.org/) - Streamlined library for visualizing data
* [Webpack](https://webpack.github.io/) - Module bundler
* [Nightmare.js](http://www.nightmarejs.org/) - End to end testing library
* [Mocha.js](https://mochajs.org/) - Half of a powerful JavaScript testing library
* [Chai.js](http://chaijs.com/) - The other half of a powerful JavaScript testing library


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

[Contributors](https://github.com/binary100/fliq/contributors) are welcome and will be clearly acknowledged.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details