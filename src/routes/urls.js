const {Router} = require('express');
const {loginUsuario,crearUsuario,actUsuario,verUsuario,borrarUsuario,crearInstitucion} = require('../controllers/control_peticiones');
const {crearInst,verInstUser} = require('../controllers/instituciones');

const router = Router();


//login
router.get('/login',loginUsuario)

//CRUD Usuarios
router.post('/pruebita', crearUsuario)
router.put('/pruebita1/:id',actUsuario)
router.get('/pruebita2/:id',verUsuario)
router.delete('/pruebita3/:id',borrarUsuario)

//CRUD instituciones
router.post('/crearInst/:id_usuario',crearInst)
router.get('/verInst/:id_usuario', verInstUser)



//solicitudes del backend


module.exports = router;