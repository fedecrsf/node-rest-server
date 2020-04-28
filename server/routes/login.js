const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', function(req, res) {

    let body = req.body;

    console.log(body.email);

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        console.log(usuarioDB);

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: err
            });
        } else if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                mensaje: `(Usuario) o contraseña incorrectos`
            });
        } else {
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                res.status(400).json({
                    ok: false,
                    mensaje: `Usuario o (contraseña) incorrectos`
                });
            } else {

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            }
        }
    });
});


module.exports = app;