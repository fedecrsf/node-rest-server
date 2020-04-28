const jwt = require('jsonwebtoken');


// =================
// Verificar token
// =================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                mensaje: 'Token no válido'
            });
        } else {
            req.usuario = decoded.usuario;

            next();
        }
    });
};

// =================
// Verificar Admin Role
// =================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        res.status(401).json({
            ok: false,
            mensaje: 'El usuario no es administrador'
        });
    } else {
        next();
    }
};

// =================
// Verificar Usuario put
// =================
let verificaUsuarioPut = (req, res, next) => {

    let usuarioID = req.usuario._id;
    let paramID = req.params.id

    if (usuarioID !== paramID) {
        res.status(401).json({
            ok: false,
            mensaje: 'El usuario logueado no puede editar otro usuario que no sea si mismo'
        });
    } else {
        next();
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaUsuarioPut
};