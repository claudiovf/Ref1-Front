# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

<<<<<<< HEAD
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
=======
The app has 3 main page views (Home, Profile, Search).

From the start, as a Formula 1 fan, I knew a few things necessary for achieving the desired result. One of them is that it needed **as few steps as possible to get anywhere**.


### Beautiful & Intuitive 

It should be obvious. You see it, you tap it, something happens. The use of a standardized set of cards and buttons makes the app **intuitive, integrated** and it **feels familiar** to most smart-phone users.

It also needed to be fun to look at and navigate. **It had to POP! I made it POP**. :sunglasses:  


### Relevant Search Results

Enter the API. With the use of GraphQL I was able to deliver only the information requested by the user in the same search result format used for all searches. That allows users to **quickly view the information that they are after in a very clear way**.


### Integrated Search & NextSearch

Essentially, if the Search has all the necessary query variables, it will **open from anywhere in the app**. It works by storing search query variables on a Redux store, which are then used by the Search component to fulfill the query and present the results. 

It worked great! It allowed me to create what I called **NextSearch** (nothing special though, I should warn). NextSearch is simply a suggested search based on the state of the profile and stat the user is most interested in. In short, the user sees a particular stat of a particular driver in a particular period, and fires up a search from there to view the driver rankings for that stat and period, instead of starting a whole new search.

Technically, you can **cycle through all 850+ driver profiles, 210+ team profiles and 4000 search results by using the NextSearch only**. 

The use of NextSearch also removed the need to create a menu on the home page. The most frequently searched information (such as driver standings, team standings, most wins, etc) are now cards with pre-defined search variables on the Home page. Up until now that kind of info required its own page view in almost any website and any sport. 


## What's Next for Ref1 App?

The app is currently up and running and has almost all the mechanics done. But Formula 1 has plenty more to be discovered. For next versions, I will be focusing on adding tracks, season calendar, race results, icons and a lot more stats. **Stay tuned!**:v: 
>>>>>>> c1bd56ea2e06ab5c59c77d42fb57e721d1c679f7

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
