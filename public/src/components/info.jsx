import React from 'react';

const Info = () => (
  <span className="row">
    <div>
    THIS IS AN INFO PAGE
    </div>
    <div >
      Launchpad:
      When you log in to FLIQ for the first time, using either Google or Facebook, FLIQ will present you with the LaunchPad page. The LaunchPad is FLIQ's way of getting to know you for the first time. You will be presented with three lists: genres, actors, and directors. If you choose to, you can select items from these lists that you like, then submit them to FLIQ's learning engine. FLIQ will use this information as a baseline to build the first pieces of our profile for you.
    </div>
    <div>
      Movie Night:
      When you are looking for a movie to watch together with others, FLIQ's Movie Night feature can provide suggestions for movies that everyone will enjoy. First, use the search field to enter the e-mail addresses of other FLIQ users. When you've populated the list of users you want, search for movies. You will see a list of suggestion that aggregate the preferences of each user in the list.
    </div>
    <div>
      Dashboard:
      If you are logged into FLIQ, the Dashboard section will help visualize what FLIQ knows about your preferences for genres, actors, directors, etc. You will be shown charts that filter down what FLIQ knows about your interests into several different charts. You may not realize you have a preference for certain things until you see it presented for you, so we hope you find this informative! You can also view any medals you have received while using FLIQ in the upper right corner.
    </div>
    <div>
      Results ('Suggestions'):
      At any time, whether you are logged in or not, you can click on the Results link to view a handful of movies that FLIQ thinks you may like. If you are not logged in, you will be shown the most liked movies in FLIQ's database. If you are logged in, however, FLIQ's learning engine will analyse your profile and determine what kinds of movies you may enjoy. There is an element of randomness in this determination, so while the results will always be tailored to you, they will not always be the same movies. FLIQ wants to make sure that you always have new options, not just the same list of movies every time.
    </div>
    <div>
      Search:
      On the Search page, you can search for specific movies that you like or dislike and tell FLIQ about your preferences. These specific inquiries are given a stronger weighting in your profile than when you are shown two random movies in the lightning rounds. If you don't want FLIQ to suggest movies that you have already seen, you can mark movies as seen from the Search page, as well. Note that you will have to go to your Dashboard in order to tell FLIQ that you don't want to have movies you've seen come up as suggestions.
    </div>
    <div>
      Lightning Rounds:
      When you don't want to search for specific things you like or dislike on the Search page, the Lightning Round page will present you with two random movies to choose between. All you need to do is tell FLIQ which movie you prefer more than the other. We don't consider this a like or dislike, but we do factor in what you've been presented with and how many times you've selected it over other options. You can run through as many of these rounds as you want. Whenever you want to see suggested movies based on what FLIQ has learned, you can click the button to go to the Results page.
    </div>
  </span>
);

export default Info;
