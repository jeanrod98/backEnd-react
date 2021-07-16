import express from 'express'
import config from './config'
import bodyParser from 'body-parser'

import productosRoutes from './routes/productos.routs.'
import cors from 'cors';

const app = express()

//habilitar cors
app.use(cors());
// habilitar cors para un solo dominio
// const whitelist = [process.env.WHITELIST];
// const corsOptions = {
//     origin: (origin, callback) =>{
//         const existe = whitelist.some( dominio => dominio === origin);
//         if (existe) {
//             callback(null, true)
//         }else{
//             callback(new Error('No Permitido por CORS'))
//         }
//     }
// }

// app.use( cors(corsOptions));
//configuracion

app.set('port', config.port)

//middlewares

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(productosRoutes);

export default app