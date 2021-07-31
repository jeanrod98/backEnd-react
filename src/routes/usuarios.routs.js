import {Router} from 'express'
import 'body-parser'
import {getUsuario, createUsuario, postUsuarioAuth} from '../controllers/usuarios.controller'

const router = Router()

//Rutas del CRUD para los usuarios
router.get('/usuarios', getUsuario);

router.post('/usuarios', createUsuario);

router.post('/userAuth', postUsuarioAuth );

router.delete('/usuarios', );

router.put('/usuarios', );

export default router