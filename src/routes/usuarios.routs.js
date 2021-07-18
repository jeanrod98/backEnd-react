import {Router} from 'express'
import 'body-parser'
import {getUsuario, createUsuario} from '../controllers/usuarios.controller'

const router = Router()

//Rutas del CRUD para los usuarios
router.get('/usuarios', getUsuario);

router.post('/usuarios', createUsuario);

router.get('/usuarios', );

router.delete('/usuarios', );

router.put('/usuarios', );

export default router