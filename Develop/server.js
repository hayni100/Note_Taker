const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


///Back end routes for api //

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//this should read db.json and ADD TO DB.JSON ARRAY and write file//

//1. add read contents of db.json and convert to an array//
//2. add data from request.body to the array//
//3. putting data made into db.json//

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json('sucess');
});

//Front end routes //
app.get('/notes',(req, res) =>
  res.sendFile(path.join(__dirname,'/public/notes.html'))
);

app.get('*',(req, res) =>
  res.sendFile(path.join(__dirname,'/public/index.html'))
);


 
app.listen(PORT, () => 
  console.log(`Listening on port ${PORT}`)
);

//Delete .filter method (array method)//
//app.post//
//app.update//
//id passed on insomnia can be used to delete (index of array)//