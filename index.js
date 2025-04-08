const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env' });

const PORT = process.env.PORT || 3000;
const DB_MONGO = process.env.DB_MONGO;

const conectarDB = async () => {
  try {
    await mongoose.connect(DB_MONGO);
    console.log('✅ Conexión a MongoDB exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

const cargarRuta = (ruta, url) => {
  try {
    app.use(url, require(path.join(__dirname, ruta)));
    console.log(`✅ Ruta registrada: ${url}`);
  } catch (error) {
    console.error(`❌ Error al cargar la ruta ${url}:`, error.message);
  }
};

cargarRuta('./src/routes/userRoutes.js', '/api/user');

app.listen(PORT, () => {
  console.log(`==============================
        Servidor en EJECUCIÓN                
==============================
- Horario y fecha de levantamiento: ${new Date().toLocaleString()}
- ¡Atención! Este servidor supervisa las 24/7 del día, OJO.
- Base Datos: Conectada.
==============================
✅ ¡El servidor está listo para recibir peticiones!`);
});
