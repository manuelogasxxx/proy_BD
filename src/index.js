//archivo principal del proyecto

const express = require('express');
const morgan = require('morgan');
const rutas = require('./routes/urls');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(rutas);
app.use((err,req,res,next)=>{
    return res.json({message: err.message})
})
app.listen(4000);
console.log('Server activo en puerto:4000')