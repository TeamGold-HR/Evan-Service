const express = require('express');
const app = express();
const path = require('path');
const PORT  = 3001;
const db = require('../database/index.js');
const seed = require('./scripts/seed.js');


app.use(express.json())

seed.seed(3);

app.use('/', express.static(path.join(__dirname, '../public')))

app.listen(PORT, function() {
    console.log('WOW WOW 3000');
})