// =====================
// Port
// =====================
process.env.PORT = process.env.PORT || 3000;


// =====================
// Entorno
// =====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =====================
// Token Expires
// =====================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// =====================
// Token seed
// =====================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// =====================
// Base de datos
// =====================
let urlDB;

if (process.env.NODE_ENV = 'dev') {
    urlDB = 'mongodb+srv://cursonode:JMWeFsfFQ6zbXEq5@cluster0-z0fxa.mongodb.net/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;