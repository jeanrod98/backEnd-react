import express from 'express'
import config from './config'
import bodyParser from 'body-parser'

import productosRoutes from './routes/productos.routs.'

const app = express()

//configuracion

app.set('port', config.port)

//middlewares

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(productosRoutes);

export default app