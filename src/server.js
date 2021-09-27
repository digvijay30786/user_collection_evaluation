const express = require('express');
const port = 2100;
const server = express();
//impoprt database connection
const connect = require('./configs/db');

//import controller
const userController = require('./controller/user.controller');
const lectureController = require('./controller/lecture.controller');
//midlware
server.use(express.json());
server.use('/user', userController);
server.use('/lecture',lectureController);
//start server

server.listen(port, async () => {
    await connect();
    console.log(`server is running on port : ${port}`);
});