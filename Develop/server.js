const path = require('path');
const express = require('express');
const note = require('./db/db.json');
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
    );


app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

app.post('/api/notes', (req, res) => {
    if (req.body) {
        readAndAppend(req.body, './db/db.json');
        res.json(`Note added`);
    }else{
        res.error('Error while adding note');
    }
});



app.listen(PORT, () =>
console.log(`App listening on port 3001!`)
);
