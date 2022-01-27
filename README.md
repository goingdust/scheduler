# Interview Scheduler

The Interview Scheduler is a single-page React application that allows users to book, edit, and cancel interviews for its given week.

## Project Features

* A user can book an interview appointment with an interviewer through 12-5pm, between Monday and Friday.
* When a day is selected, it changes colour and displays its appointment spots.
* Each day displays the number of appointment spots currently available.
* A user can book an interview in an empty appointment spot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can edit the details of or cancel an existing interview.
* A user is presented with a confirmation when they attempt to cancel an interview.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A status indicator is shown while an appointment spot is being updated in the server.
* An error is shown if an interview cannot be saved or deleted.

### List of day's appointments

*Screenshot

*User can click on any of the days in the sidebar and see each list of appointments available*

### Booking a new appointment

*Screenshot

*User has to enter a name AND click on an interviewer for the appointment to be successfully booked*

### Cancel confirmation

*Screenshot

*If user clicks cancel, the appointment remains booked and goes back to showing the scheduled user and interviewer*

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```

## Dependencies

* Axios
* Classnames
* Normalize.css
* React
* React-dom
* React-scripts
* Babel/core
* Storybook/addon-actions
* Storybook/addon-backgrounds
* Storybook/addon-links
* Storybook/addons
* Storybook/react
* Testing-library/jest-dom
* Testing-library/react
* Testing-library/react-hooks
* Babel-loader
* Node-sass
* Prop-types
* React-test-renderer
* Cypress-real-events
* Eslint-plugin-cypress