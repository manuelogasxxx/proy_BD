//archivo principal del proyecto

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.listen(3000);
console.log('Server activo en puerto:3000')