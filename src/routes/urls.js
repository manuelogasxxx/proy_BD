const {Router} = require('express');
const {loginUsuario,crearUsuario,actUsuario,verUsuario,borrarUsuario,crearInstitucion} = require('../controllers/control_peticiones');
const {crearInst,verInstUser,verTipoInst,borrarInstitucion} = require('../controllers/instituciones');
const {crearMateria,borrarMateria,actMateria,verMaterias,verMateria} = require('../controllers/materias');

const router = Router();


//login
router.post('/login',loginUsuario)

//CRUD Usuarios
router.post('/crearUsuario', crearUsuario)
router.put('/actUsuario/:id',actUsuario)
router.get('/verUsuario/:id',verUsuario)
router.delete('/pruebita3/:id',borrarUsuario)

//CRUD instituciones
router.post('/crearInst/:id_usuario',crearInst)
router.get('/verInst/:id_usuario', verInstUser)
router.get('/verTipoInst',verTipoInst)
router.delete('/borrarInst/:id_institucion',borrarInstitucion);



//CRUD de materias
router.post('/crearMateria/:id_inst',crearMateria)
router.put('/actMateria/:id_materia',actMateria)
router.delete('/borrarMateria/:id_materia',borrarMateria)
router.get('/verMaterias/:id_usuario',verMaterias)
router.get('/verMateria/:id_materia',verMateria)
//solicitudes del backend


module.exports = router;