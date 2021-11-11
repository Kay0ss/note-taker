const path = require("path");
const express = require("express");
let data = require('./db/db.json');
const fs = require("fs");
const { v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 5000;

const app = express();

// let global = data;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('/api/notes', (req, res) => {
    return res.json(data);
    console.log('line 32 ' + JSON.stringify(data));
});

app.post('/api/notes', (req, res) => {
    let currData = req.body;
    currData.id = uuidv4();

    data.push(currData);

    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
        err ? console.error(err) : console.log('Success!')
    },
        console.log('line 38' + JSON.stringify(data))
    );

    return res.json(data);
});

app.delete('/api/notes/:id', (req, res) => {
    let toDeleteId = req.params.id;
    data = data.filter(note => note.id != toDeleteId);

    fs.writeFile('./db/db.json', JSON.stringify(data), (err) =>{
        err ? console.error(err) : console.log('Twas a success!')
    });

    res.json(data);
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
