import {getConnection, sql, queries} from '../database'

//Consultar usuarios
export const getUsuario = async (req, res) => {
    try {
        
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los usuarios de la bd
        const result = await pool.request().query(queries.getAllUsers);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
};

//Consultar un usuario por correo y contraseña
export const postUsuarioAuth = async (req, res) => {
    try {
       
        const {correo_usu, contrasenia_usu} = req.body 
        //llamamos la conexion que retorna el pool 
        // console.log(correo_usu);
        // console.log(contrasenia_usu);
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide el usuario de la bd
        const result = await pool.request()
        .input('correo_usu', correo_usu)
        .input('contrasenia_usu', contrasenia_usu)
        .query(queries.postUsuarioAuth);
        // console.log(result.recordset.length == 0);
        const {id_usuario, nombre_usu, apellido_usu, tipo_usu, celular_usu, direccion_usu} = result.recordset[0];
        // console.log(id_usuario);
        // console.log(nombre_usu);
        // console.log(apellido_usu);
        // console.log(tipo_usu);
        const userResponse = {
            id_usuario: id_usuario,
            nombre_usu: nombre_usu,
            apellido_usu: apellido_usu,
            tipo_usu: tipo_usu,
            correo_usu,
            celular_usu,
            direccion_usu
        }
        if(result.recordset.length == 0){
            res.json({msgError: 'El usuario no existe'});
            res.status(5000);

        }else{

            res.json(userResponse);
        }
    } catch (error) {
        res.json({msg: 'El usuario no existe'});
        
    }
};
// Consultar usuario por id 
export const getUsuarioById = async (req, res) => {
    try {
        
        // obtener el id que nos mandan 
        const {id} = req.params 
        //llamamos la conexion que retorna el pool 
        const pool = await getConnection();
        //con el pool realizamos la peticion en este caso pide los productos de la bd
        const result = await pool.request()
        .input('id', id)
        .query(queries.getUserById);

        // const {id_usuario, nombre_usu, apellido_usu, tipo_usu, celular_usu, correo_usu, direccion_usu} = result.recordset[0];
        // console.log(id_usuario);
        // console.log(nombre_usu);
        // console.log(apellido_usu);
        // console.log(tipo_usu);
        // const userResponse = {
        //     id_usuario,
        //     nombres: nombre_usu+' '+apellido_usu,
        //     tipo_usu,
        //     celular_usu,
        //     correo_usu,
        //     direccion_usu,


        // }
        res.json(result.recordset[0]);


    } catch (error) {
        res.status(500);
        res.send(error.message);
        
    }
};

//ingresar usuarios
export const createUsuario = async (req, res) => {
    try {
        
        const { id_usuario,nombre_usu,apellido_usu,
        direccion_usu,celular_usu,
        contrasenia_usu,correo_usu } = req.body;
    
        let {convencional_usu, tipo_usu} = req.body;
    
        //validar que los campos existan
        if(  id_usuario == null || id_usuario == '' ||
        nombre_usu == null || nombre_usu == ''||
        apellido_usu == null || apellido_usu == '' ||
            direccion_usu == null ||  direccion_usu == '' ||
            celular_usu == null || celular_usu == '' ||
             contrasenia_usu == null || contrasenia_usu == '' ||
            correo_usu == null || correo_usu == ''  ){
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
    
        res.json({msgSuccess: 'success'})
    } catch (error) {
        // res.status(500);
        // res.send(error.message);
        res.json({msgError: 'error add user'})
        
    }
};

//actualizar Usuarios
export const updateUsuario = async (req, res) => {
    try {
        const { id_usuario,nombre_usu,apellido_usu,
            direccion_usu,celular_usu,
            contrasenia_usu,correo_usu } = req.body;
        
            let {convencional_usu, tipo_usu} = req.body;

             // obtener el id que nos mandan 
        const {id} = req.params 
        
            //validar que los campos existan
            if( id_usuario == null || id_usuario == '' ||
            nombre_usu == null || nombre_usu == ''||
            apellido_usu == null || apellido_usu == '' ||
                direccion_usu == null ||  direccion_usu == '' ||
                celular_usu == null || celular_usu == '' ||
                 contrasenia_usu == null || contrasenia_usu == '' ||
                correo_usu == null || correo_usu == '' ){
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
            .input("id_usuario", sql.VarChar, id)
            .input("nombre_usu", sql.VarChar, nombre_usu)
            .input("apellido_usu", sql.VarChar, apellido_usu)
            .input("direccion_usu", sql.VarChar, direccion_usu)
            .input("convencional_usu", sql.VarChar, convencional_usu)
            .input("celular_usu", sql.VarChar, celular_usu)
            .input("contrasenia_usu", sql.VarChar, contrasenia_usu)
            .input("correo_usu", sql.VarChar, correo_usu)
            .input("tipo_usu", sql.VarChar, tipo_usu)
            .input("fechaReg_usu", sql.SmallDateTime, fechaReg_usu)
        
            .query(queries.updateUser);
        
        res.json({msgSuccess: 'success'})
    } catch (error) {
        console.log(error);
        res.json({msgError: 'error add user'})
        
    }
}

// Eliminar Usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // console.log(id);
      const pool = await getConnection();
        await pool
        .request()
        .input("id_usuario", id)
        .query(queries.deleteUsuario)
        res.json({ msg: "success" });
    } catch (error) {
      console.log(error);
      res.json({ msg: "error" });
    }
  
  }