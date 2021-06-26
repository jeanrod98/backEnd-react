const express = require('express');
const routes =  require('./routes');
const bodyParser = require('body-parser');

// Crear servidor

const app = express();

//middlewares
// habilitar boddy parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//habilitar el routing
app.use('/', routes());
//definir puerto
app.listen(4000, ()=> {
    console.log('Servidor funcionando 4000')
    
})