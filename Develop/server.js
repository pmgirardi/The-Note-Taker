// Set up variables to import express
const express = require('express');

// Create an instance of the express app
const app = express();


//import routes apiRoutes and htmlRoutes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
