This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Steps to run this app locally:

1. Clone the repository to your local machine.

2. Go to /src/server/config/router.js and enter your Dark Sky API where it says 'ENTER YOUR DARK SKY API HERE'.

3. Run npm install to install all the dependencies.

4. Run npm build to build the project.

5. Run npm start to start the server.

6. Go to localhost:8080.

Some notes:

I used React Redux because that I am most familiar with it. I did not write any tests because I am still learning testing
and did not want to spend hours and hours on this assigment. This app is based on the current time. So if the current time is in between
the commute times, it will only show the evening commute time. After the evening commute time, it will display tomorrow's morning and evening comute times.

Click [Here](https://github.com/facebookincubator/create-react-app) to Read more on Create React App.