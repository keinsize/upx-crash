# UP X CRASH

A copy of the popular Crash game from the UP-X
![image](https://github.com/keinsize/upx-crash/assets/118171210/3ffa774d-d842-4188-902e-93991c5ffe2d)

## Technologies Used 
* [Next.js](https://nextjs.org/) - The React Framework for the Web
* [React.js](https://reactjs.org/) - JS framework used to create the frontend.
* [Express.js](https://expressjs.com/) - The backend server environment and serves as an API.
* [Node.js](https://nodejs.org/en/) - JS environment that executes JS outside of the browser.
* [Socket.io](https://socket.io/) - Allows communication between the server and client in real time. 
* [MongoDB](https://www.mongodb.com/) - NoSQL database used to store all user and server information. 
* [Passport.js](https://www.passportjs.org/) - Middleware used to authenticate and authorize users. Handles logins and registrations.
* [bcrypt.js](https://www.npmjs.com/package/bcrypt) - Secures user passwords by hashing all passwords before storing in database. 
* [Chart.js](https://www.chartjs.org/) - Create visualizations of data through charts and graphs like line graphs. 
* HTML
* CSS

## Installation 
    // Clone the repository
    $ git clone https://github.com/keinsize/upx-crash
    
    // Navigate to directory
    $ cd ./upx-crash

### Setup and Run Client

    // Navigate to client directory 
    $ cd ./frontend
    
    // install packages
    $ npm i 
    
    // start client (localhost:3000)
    $ yarn dev

### Setup and Run Server

    // Navigate to server directory 
    $ cd ./backend
    
    // install packages
    $ npm i 
    
    // install nodemon for development
    $ npm i -D nodemon
    
    // start node server (localhost:4000) and socket.io server (localhost:3001) 
    $ npm start 
