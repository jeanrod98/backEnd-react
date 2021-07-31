import {getConnection, sql, queries} from '../database'


//Consultar productos
export const getProductos = async (req, res) => {
    try {
        
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los productos de la bd
        const result = await pool.request().query(queries.getAllProducts);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
//Consultar un producto por id
export const getProductoByID = async (req, res) => {
    try {
        
        // obtener el id que nos mandan 
        const {id} = req.params 
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los productos de la bd
        const result = await pool.request()
        .input('id', id)
        .query(queries.getProductById);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
};

//ingresar productos
export const createProducto = async (req, res) => {
    try{
    const { id_producto,nombre_produc,cantidad_produc,
    descripcion_produc,precio_produc,pesoImg_produc,
    nombreImg_produc,promocion_produc,imagen_produc } = req.body;

    //validar que los campos existan
    if( id_producto == null || nombre_produc == null ||cantidad_produc == null ||
        descripcion_produc == null || precio_produc == null || pesoImg_produc == null ||
        nombreImg_produc == null || promocion_produc == null ||imagen_produc == null){
            return res.status(400).json({msg: "Por favor llene todo los campos."})
        }

    //Obtenemos la fecha actual
    const fecha = new Date();
    const fechaReg_produc = fecha.toUTCString();

    //Agregamos los datos a la base de datos
    const pool = await getConnection();

    await pool
    .request()
    .input("id_producto", sql.VarChar, id_producto)
    .input("nombre_produc", sql.VarChar, nombre_produc)
    .input("cantidad_produc", sql.Int, cantidad_produc)
    .input("descripcion_produc", sql.VarChar, descripcion_produc)
    .input("precio_produc", sql.Decimal(18,2), precio_produc)
    .input("pesoImg_produc", sql.Int, pesoImg_produc)
    .input("nombreImg_produc", sql.VarChar, nombreImg_produc)
    .input("promocion_produc", sql.Int, promocion_produc)
    .input("imagen_produc", sql.VarChar, imagen_produc)
    .input("fechaReg_produc", sql.SmallDateTime, fechaReg_produc)

    .query(queries.addNewProducts);

    res.json({id_producto, nombre_produc, cantidad_produc, descripcion_produc, precio_produc, pesoImg_produc, nombreImg_produc, promocion_produc, imagen_produc, fechaReg_produc})

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
