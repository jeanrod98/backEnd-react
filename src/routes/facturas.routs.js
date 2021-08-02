import {Router} from 'express'
import 'body-parser'
import {generarfacturas, transaccion } from '../controllers/facturas.controller'

const router = Router()

//Rutas del CRUD para los usuarios
router.post('/facturas', generarfacturas);


router.post('/transaccion', transaccion );

// router.delete('/usuarios', );

// router.put('/usuarios', );

export default router