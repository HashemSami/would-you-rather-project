# MyReads Project

This is a project for the final assessment for Udacity's React & Redux course. 
The project is for creating a UI using React & Redux for a "would you rather" game, where users answer other users questions and createing thier own. This game will also show results for the answered questions and compare with other users answeres.

## TL;DR

To get start using the project right away:

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   └── index.html # DO NOT MODIFY.
└── src
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── index.js #  It is used for DOM rendering and providing the store to the app components.
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── actions # Helpful images for the app. Use at your discretion.
    │   ├── authedUser.js # actions for setting the authorized user information.
    │   ├── questions.js # actions for handling the questions actions done by users. 
    │   └── shared.js # actions for handling deferent data like loading the inial data from database.
    ├── components # This file holds the components that is running on the UI
    │   ├── App.js # This is the root of the app.
    │   ├── Login.js # Component for selecting the authorized user to use the app.
    │   ├── Home.js # A Home page for the user that has the questions list and other functionalities. 
    │   ├── UnasweredQuestions.js # Component for displaying each unaswered question links for the users.
    │   ├── QuestionPage.js # This component will layout the unaswered question details to choos an answer.
    │   ├── AsweredQuestions.js # This component will layout all questions answered with results.
    │   ├── NewQuestion.js # This component is for adding a new question to the database.
    │   ├── LeaderBoard.js # This component is for showing the top users that were active on the app.
    │   ├── Nav.js # This component is for laying out the navigation bar.
    │   └── NoMatch.svg # This component will show if the question URL doesn't match the app routes.
    ├── middlewares # This folder includes the meddlewares that will run before the dispatch of data.
    │   ├── logger.js # This file will log each action the user will take on the console
    │   └── index.js # This file will include all functionalities the middleware has and send them to the app.
    ├── reducers # This folder is for setting the deferent parts of the store.
    │   ├── authedUser.js #a reducer for the authedUser part of the store.
    │   ├── questions.js #a reducer for the questions part of the store.
    │   ├── users.js #a reducer for the users part of the store.
    │   ├── nav.js #a reducer for the navigation part of the store.
    │   └── index.js # This file will include all functionalities the reducer has and send them to the app.
    ├── utils
    │   └── _DATA.js # A JavaScript API for the provided Udacity backend.
    └──
```

## Important
The backend API uses a fixed set of data and is limited to a particular set of users and questions, which can be found in [_DATA.js].