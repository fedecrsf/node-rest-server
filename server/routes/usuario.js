const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole, verificaUsuarioPut } = require('../middlewares/autenticacion');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            } else {

                Usuario.countDocuments({ estado: true }, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });
            }
        });
});

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //img: body.img,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((error, usuarioDB) => {
        if (error) {
            res.status(400).json({
                ok: false,
                mensaje: error
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.put('/usuario/:id', [verificaToken, verificaUsuarioPut], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioBorrado) => {

        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        }
    });

});

module.exports = app;