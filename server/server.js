require('./config/config');
require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

mongoose.connect('mongodb+srv://cursonode:JMWeFsfFQ6zbXEq5@cluster0-z0fxa.mongodb.net/cafe', ({ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }))
    .then(console.log('Conectado a cafe'.blue))
    .catch(error => console.log(error));

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`.blue);
});