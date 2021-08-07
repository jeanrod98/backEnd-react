import {Router} from 'express'
import 'body-parser'
import {getDelivery, getDeliveryById } from '../controllers/delivery.controller'

const router = Router()

//Rutas del CRUD para los usuarios
router.get('/delivery', getDelivery);
router.get('/delivery/:id', getDeliveryById);

// router.post('/transaccion', transaccion );

// router.delete('/usuarios', );

// router.put('/usuarios', );

export default router