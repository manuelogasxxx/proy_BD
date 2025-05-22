const {Router} = require('express');
const {loginUsuario,crearUsuario,actUsuario,verUsuario,borrarUsuario,verGeneros} = require('../controllers/control_peticiones');
const {crearInst,verInstUser,verTipoInst,borrarInstitucion} = require('../controllers/instituciones');
const {crearMateria,borrarMateria,actMateria,verMaterias,verMateria} = require('../controllers/materias');
const {crearAlumno,obtenerAlumnosInscritos} = require('../controllers/alumnos');
const {contarSesionesClase,obtenerEstadisticasAsistenciaPorMateria,verDetalleMateria,
        obtenerAsistenciasAlumno,obtenerSesionesMateria,borrarSesion
}= require('../controllers/asistencias') 

const router = Router();


//login
router.post('/login',loginUsuario) //probado (2 consultas)

//CRUD Usuarios
router.post('/crearUsuario', crearUsuario) //probado (1 consulta)
router.put('/actUsuario/:id',actUsuario) //probado (1 consulta)
router.get('/verUsuario/:id',verUsuario) //probado (1 consulta)
router.delete('/borrarUsuario/:id',borrarUsuario) //probado (1 consulta)

//CRUD instituciones
router.post('/crearInst/:id_usuario',crearInst)// probado (1 consulta)
router.get('/verInst/:id_usuario', verInstUser)//probado (1 consulta)
router.get('/verTipoInst',verTipoInst)//probado (1 consulta)
router.delete('/borrarInst/:id_institucion',borrarInstitucion); //probado (1 consulta)



//CRUD de materias
router.post('/crearMateria/:id_inst',crearMateria)//probado(1 consulta)
router.put('/actMateria/:id_materia',actMateria)
router.delete('/borrarMateria/:id_materia',borrarMateria)//probado (1 consulta)
router.get('/verMaterias/:id_usuario/:id_inst',verMaterias)//probado (1 consulta)
router.get('/verMateria/:id_materia',verMateria)
//solicitudes del backend

//CRUD de alumnos
router.post('/crearAlumno/:id_inst/:id_materia',crearAlumno) //falta hacer la interfáz (2 consultas)
router.get('/verAlumnosInscritos/:id_materia/:genero',obtenerAlumnosInscritos) //probado (1 consulta)
//trabajando en la de borrarAlumno

//peticion insana 
router.get('/verGeneros',verGeneros); //probado (1 consulta)

//peticiones para asistencia
router.get('/contarSesionesClase/:id_materia',contarSesionesClase); //probado (1 consulta)
router.get('/estadisticasAsistencia/:id_materia',obtenerEstadisticasAsistenciaPorMateria);//probado (1 consulta)

router.get('/verAsistenciasAlumno/:id_materia/:id_alumno',obtenerAsistenciasAlumno); //probado a medias.
router.get('/verSesionesMateria/:id_materia',obtenerSesionesMateria) //probado a medias

//ver detalles materia.

//peticiones insanas

router.delete('/borrarSesion/id_sesion',borrarSesion);//aun no está probada
router.get('/verDetallesMateria/:id_materia/:id_usuario',verDetalleMateria)// probada (1 consulta)
module.exports = router;