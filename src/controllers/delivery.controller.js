import {getConnection, sql, queries} from '../database'

//Consultar delivery
export const getDelivery = async (req, res) => {
    try {
        
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los usuarios de la bd
        const result = await pool.request().query(queries.getDelivery);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
};

//Consultar delivery por id
export const getDeliveryById = async (req, res) => {
    try {
        const {id} = req.params;
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los usuarios de la bd
        const result = await pool.request()
        .input('id_delivery', id)
        .query(queries.getDeliveryById);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }

    
};