import {getConnection, sql} from '../database/conexion'

//Consultar usuarios
export const getUsuario = async (req, res) => {
    //llamamos la conexion que retorna el pool 
    const pool = await getConnection();
    //con el pool realizamos la peticion en este caso pide los usuarios de la bd
    const result = await pool.request().query('SELECT * FROM TMAEUSUARIO');
    res.json(result.recordset);
};

//ingresar usuarios
export const createUsuario = async (req, res) => {
    const { id_usuario,nombre_usu,apellido_usu,
    direccion_usu,celular_usu,
    contrasenia_usu,correo_usu } = req.body;

    let {convencional_usu, tipo_usu} = req.body;

    //validar que los campos existan
    if( id_usuario == null || nombre_usu == null ||apellido_usu == null ||
        direccion_usu == null || celular_usu == null || contrasenia_usu == null || 
        correo_usu == null ){
            return res.status(400).json({msg: "Por favor llene todo los campos."})
        }
        // console.log('Se ejecuta aqui');
        
    // Si no tiene convencional se le pone uno por defecto
    if (convencional_usu == null || convencional_usu == ''){
        convencional_usu = '000000000';

    }
    
    // al cliente se le asigna un usuario por defecto cliente
    if (tipo_usu == null){
        tipo_usu = 'Cliente';

    }
    
    
     //Obtenemos la fecha actual
     const fecha = new Date();
     const fechaReg_usu = fecha.toUTCString();
    

    //Agregamos los datos a la base de datos
    const pool = await getConnection();

    await pool
    .request()
    .input("id_usuario", sql.VarChar, id_usuario)
    .input("nombre_usu", sql.VarChar, nombre_usu)
    .input("apellido_usu", sql.VarChar, apellido_usu)
    .input("direccion_usu", sql.VarChar, direccion_usu)
    .input("convencional_usu", sql.VarChar, convencional_usu)
    .input("celular_usu", sql.VarChar, celular_usu)
    .input("contrasenia_usu", sql.VarChar, contrasenia_usu)
    .input("correo_usu", sql.VarChar, correo_usu)
    .input("tipo_usu", sql.VarChar, tipo_usu)
    .input("fechaReg_usu", sql.SmallDateTime, fechaReg_usu)

    .query(
        `INSERT INTO TMAEUSUARIO (id_usuario, nombre_usu, apellido_usu, direccion_usu,convencional_usu, celular_usu, contraseña_usu, correo_usu, tipo_usu, fechaReg_usu) 
        VALUES (@id_usuario, @nombre_usu, @apellido_usu, @direccion_usu, @convencional_usu, @celular_usu, @contrasenia_usu, @correo_usu, @tipo_usu, @fechaReg_usu)`
    );

    res.json('Nuevo Cliente')
};
