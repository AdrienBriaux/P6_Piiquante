const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('requête reçue !');
})

module.exports = app;