import {Router} from 'express'
import 'body-parser'
import {getUsuario, createUsuario, postUsuarioAuth, getUsuarioById, updateUsuario, deleteUsuario} from '../controllers/usuarios.controller'

const router = Router()

//Rutas del CRUD para los usuarios
router.get('/usuarios', getUsuario);

router.post('/usuarios', createUsuario);

router.post('/userAuth', postUsuarioAuth );

router.get('/usuarios/:id', getUsuarioById);

router.put('/usuarios/:id', updateUsuario);

router.delete('/usuario-delete/:id', deleteUsuario)

export default router