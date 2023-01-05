const express = require("express");
const path = require("path");
//read, write, and append content to file
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const uuidv1 = require('uuid/v1');
///Back end routes for api //

//GET request
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST request 
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json("sucess");

  //Deconstructing assigmnent for the items in req.body//
  const { title, text} = req.body;

  //If all the required properties are present
  if (title && text) {
    //variable for notes we will save///
    const newNote = {
      title,
      text,
      id: uuidv1(),
    };

    //convert the data into a string so we can save it and write to db.json
    readAndAppend(newNote, "./db/db.json");
    console.log(newNote);
  }
});

//Front end routes //
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//Delete .filter method (array method)//
//app.post//
//app.update//
//id passed on insomnia can be used to delete (index of array)//
