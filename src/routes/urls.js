const {Router} = require('express');
const pool = require('../config/db')
const router = Router();

//prueba de solicitudes
router.get('/', 
    (req,res)=>{ res.send('jijija');
})

router.get('/si', async(req,res)=>{
    const result = await pool.query('SELECT NOW()');
    console.log(result);
    res.json('executed');
})

//solicitudes del backend


module.exports = router;