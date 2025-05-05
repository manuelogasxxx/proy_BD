const {Router} = require('express');
const {loginUser,crearUsuario,act_usuario} = require('../controllers/control_peticiones')


const router = Router();

//prueba de solicitudes
router.get('/',loginUser)

//CRUD Usuarios
router.post('/pruebita', crearUsuario);
router.put('/pruebita1/:id',act_usuario)



//solicitudes del backend


module.exports = router;