require('dotenv').config();
// const http = require('http');
const express = require('express');
const router = require('./router/index');

// server port
const SERVER_PORT = process.env.PORT || 3000;

// initiaing express app
const app = express();

// const httpServer = http.createServer(app);

// to support JSON-encoded bodies
app.use(express.json());

// to support URL-encoded bodies
// app.use(express.urlencoded());

// api calls or router calls
app.use(router);

app.listen(SERVER_PORT, () => {
  console.log(`app listening on ${SERVER_PORT}`);
});
