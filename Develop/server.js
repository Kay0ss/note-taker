const path = require('path');
const express = require('express');
const data = require('./db/db.json');
const fs = require("fs");
const { v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

let global = data;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
    );


app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, './public/index.html'))
// );

app.get('/api/notes', (req, res) => {
    res.json(globalData);
    console.log('line 32 ' + JSON.stringify(global));
});

app.post('/api/notes', (req, res) => {
    let currData = req.body;
    currData.id = uuidv4();

    global.push(currData);

    fs.writeFile('./db/db.json', JSON.stringify(global), (err) => {
        err ? console.log(err) : console.log('Success!')
    },
        console.log(' line 38' + JSON.stringify(global))
    );

    res.json(global)
});



app.listen(PORT, () =>
console.log(`App listening on port 3001!`)
);
