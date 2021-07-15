import {Router} from 'express'
import 'body-parser'
import {getProductos, createProducto} from '../controllers/productos.controller'

const router = Router()

router.get('/productos', getProductos);

router.post('/productos', createProducto);

router.get('/productos', );

router.delete('/productos', );

router.put('/productos', );

export default router