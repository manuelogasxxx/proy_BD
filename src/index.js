//archivo principal del proyecto

const express = require('express');
const morgan = require('morgan');
const rutas = require('./routes/urls');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(rutas);
app.listen(3000);
console.log('Server activo en puerto:3000')