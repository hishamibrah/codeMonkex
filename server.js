const http = require('http');
const app = require('./app');
//const express = require('express');

const port = process.env.PORT || 8070;
const server = http.createServer(app);
server.listen(port);
