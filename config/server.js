const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log('Servindo com express na porta ', port)
});

module.exports = app;