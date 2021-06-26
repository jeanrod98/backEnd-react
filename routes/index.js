const express = require('express');
const router = express.Router();

module.exports = function()  {
    //Pagina o Ruta inicial de la API
    router.get('/', (req, res, next)=>{
        res.redirect('/api/v1');

    });

    router.get('/api/v1', (req, res, next)=>{
        res.json({mensaje: 'Bienvenido a la API de VEICORD'});

    })
    //


    return router;
}