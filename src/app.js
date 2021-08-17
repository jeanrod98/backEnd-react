import express from 'express'
import config from './config'
import bodyParser from 'body-parser'
import path from 'path'

// Rutas
import productosRoutes from './routes/productos.routs'
import usuariosRoutes from './routes/usuarios.routs'
import facturasRoutes from './routes/facturas.routs'
import deliveryRoutes from './routes/delivery.routs'

import multer from 'multer';

import cors from 'cors';

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
//multer para  imagenes
app.use(multer({
    storage,
    dest: 'public/uploads',
    limits: {fileSize: 500000},
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png/;
        const mimetype = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
        cb("Error: Archivo no soportado por la extensión o tipo.")
    }
}).single('img-product'));


app.use(productosRoutes, usuariosRoutes, facturasRoutes, deliveryRoutes);


app.use(express.static('public/pdfs'));
app.use(express.static('public/uploads'));
export default app