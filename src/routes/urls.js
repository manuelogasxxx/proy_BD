const {Router} = require('express');
const {loginUser,crearUsuario} = require('../controllers/control_peticiones')


const router = Router();

//prueba de solicitudes
router.get('/',loginUser)

router.post('/pruebita', crearUsuario)


//solicitudes del backend


module.exports = router;