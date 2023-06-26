// Import express.js 
const express = require('express');


// On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

const fs = require('fs');


//Import path node package to enable the finding of path files

const path = require('path');

// Invoke express and store within app

const app = express();

const noteid = require('./noteid');

const PORT = process.env.PORT || 3002;

// Middleware to request from public folder

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes 


 // Get request for index.html file

 app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "public/index.html"));
 });

 // Get request for notes.html file

 app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    );

/* The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.*/

app.get("/api/notes", (req, res) => {
   var getNotes = fs.readFileSync("./db/db.json");
   var showNotes = JSON.parse(getNotes);
   return res.json(showNotes);
 });
 
 /* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
*/ 
 
 app.post("/api/notes", (req, res) => {
// ID added to each note being added to the JSON file
   const {title, text} = req.body;
   const id = noteid();
   const addNote = {
      title, 
      text, 
      id};
 
   var storeNotes = fs.readFileSync("./db/db.json");
   var savedArr = JSON.parse(storeNotes);
 
   savedArr.push(addNote);
 
   var addData = JSON.stringify(savedArr);
   fs.writeFile("./db/db.json", addData, (err) => {
     err ? console.error("Error") : console.log("Success");
   });
   res.json("New Note Added.");
 });

 // Updates and deletes notes


app.delete('/api/notes/:id', (req, res) => {
const noteid = req.params.id;
fs.readFile('./db/db.json', 'utf8', (err, data) => {
if (err) {
throw err
} else {
console.log('file read successfully');
}

// log and then parse data
// console.log(data);
parsedData = JSON.parse(data);

let newData = [];

// loop through the array and only push notes that do not match the id of the deleted note
parsedData.forEach(element => {
if (element.id == noteid) {
  console.log(`Successfully deleted ${noteid}`);
} else {
  newData.push(element);
}
});

// write new data to file
fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
if (err) {
  throw err;
} else {
  console.log('file updated successfully');
}
});

// refresh the notes showing
res.redirect('/api/notes');
});
});


// app.listen to callback function once express is invoked

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


