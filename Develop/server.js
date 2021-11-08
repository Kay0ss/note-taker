const path = require('path');
const express = require('express');
const api = require('./public/assets/js/index.js');
const fs = require("fs");

const PORT = process.env.port || 3001;

const app = express();

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get
