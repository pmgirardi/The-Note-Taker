// Import express.js 
const express = require('express');

//Import path node package to enable the finding of path files

const path = require('path');

// Invoke express and store within app

const app = express();

const PORT = 3001;

// Middleware to request from public folder

app.use(express.static('public'));

// Routes 

// Route to home 'public' folder
 app.get('/', (req,res) => res.send('Navigate to /send or routes'));

 // Get request for index.html file

 app.get('/index', (req,res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
    );

 // Get request for notes.html file

 app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    );

// app.listen to callback function once express is invoked

app.listen(PORT, () =>
    console.log(`listening at http://localhost:$(PORT)`)
    );


/* On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.


The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).