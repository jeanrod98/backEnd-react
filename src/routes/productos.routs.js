import {Router} from 'express'
import 'body-parser'
import {getProductos, getProductoByID, createProducto, updateProducto} from '../controllers/productos.controller'

const router = Router()

router.get('/productos', getProductos);

router.post('/productos', createProducto);

router.get('/productos/:id', getProductoByID);

router.delete('/productos', );

router.put('/productos-update/:id', updateProducto);

export default router