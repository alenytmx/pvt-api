const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const URL = process.env.DB_MONGO;

const conectarDB = async () => {
    try {
        await mongoose.connect(URL); // Sin opciones obsoletas
        console.log('Everything in order, server running.');
    } catch (error) {
        console.log(error);
        process.exit(1); // Se detiene la aplicación
    }
};

module.exports = conectarDB;