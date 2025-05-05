const {Router} = require('express');
const {loginUsuario,crearUsuario,actUsuario,verUsuario,borrarUsuario} = require('../controllers/control_peticiones')


const router = Router();


//login
router.get('/login',loginUsuario)

//CRUD Usuarios
router.post('/pruebita', crearUsuario)
router.put('/pruebita1/:id',actUsuario)
router.get('/pruebita2/:id',verUsuario)
router.delete('pruebita3/:id',borrarUsuario)



//solicitudes del backend


module.exports = router;