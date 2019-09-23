## Introduction

Chiclet allows users to plan and keep track of their year by month. A user can add items such as special events, goal deadlines, or focus themes to the months and the app provides a view of the entire year. Alternatively, the app can be used as an accomplishment record keeper rather than a planner of future milestones. Users can add new items, delete items, and edit items. 

This app is a capstone project for Thinkful's full stack JavaScript program. 

## Build

Chiclet's front end is built with React. The back end is built with Express, and PostgreSQL for the databse. The database and server and hosted with Heroku.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live Link: https://www.chiclet.now.sh

## Images

![Chiclet Landing Page](/img-readme/chiclet-landing.png)
***
![Chiclet Months Page](/img-readme/chiclet-months.png)
***
![Chiclet Single Month Page](/img-readme/chiclet-month.png)
***
![Chiclet Edit Item Page](/img-readme/chiclet-edit.png)

## Security
User passwords are hashed using bcrypt.js. Logged in users are provided a JWT for protected requests.

## API Documentation
API endpoints include:

POST to '/users' to create a new user
POST to '/auth/login' to sign in an existing user
GET to '/items' to access all of a user's calendar items
POST to '/items' to add a new item to the user's calendar
PATCH to '/items/:itemId' to update an existing item
DELETE to '/items/:itemId' to delete a item

## Future Development
Additional features and improvements would include:

- Options page with a form for resetting your password or deleting your account
- Ability to attach photos, files, and dates to items
- Alternate view of the single month page