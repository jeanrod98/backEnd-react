import { getConnection, sql, queries } from "../database";
import 'dotenv';

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
    const { id } = req.params;
    //llamamos la conexion que retorna el pool
    const pool = await getConnection();
    //con el pool realizamos la peticion en este caso pide los productos de la bd
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.getProductById);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//ingresar productos
export const createProducto = async (req, res) => {
  try {
    // const {
    //   id_producto,
    //   nombre_produc,
    //   cantidad_produc,
    //   descripcion_produc,
    //   precio_produc,
    //   pesoImg_produc,
    //   nombreImg_produc,
    //   promocion_produc,
    //   imagen_produc,
    // } = req.body;

    const { producto } = req.body;
    const productoJSon = JSON.parse(producto)
   
    const file = req.file;
    // console.log(file);
    const {
      id_producto,
      nombre_produc,
      cantidad_produc,
      descripcion_produc,
      precio_produc,
      promocion_produc,
      dscpLarga_produc,
      imagen_produc
    } = productoJSon;
   
    
    //url de la imagen 
    let urlImg = ''
    if(file){
      urlImg = `${process.env.HOST}${file.filename}`
    }else if(imagen_produc == '' || imagen_produc === null){
      urlImg = `${process.env.HOST}no-image.png`;
    }else{
      urlImg = imagen_produc;
    }

    //validar que los campos existan
    if (
      id_producto == null ||
      nombre_produc == null ||
      cantidad_produc == null ||
      descripcion_produc == null ||
      precio_produc == null ||
      dscpLarga_produc == null ||
      promocion_produc == null
    ) {
      return res.status(400).json({ msg: "Por favor llene todo los campos." });
    }
console.log(productoJSon);
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
      .input("precio_produc", sql.Decimal(18, 2), precio_produc)
      .input("promocion_produc", sql.Int, promocion_produc)
      .input("imagen_produc", sql.VarChar, urlImg)
      .input("fechaReg_produc", sql.SmallDateTime, fechaReg_produc)

      .query(queries.addNewProducts);

    res.json({
      id_producto,
      nombre_produc,
      cantidad_produc,
      descripcion_produc,
      precio_produc,
      pesoImg_produc,
      nombreImg_produc,
      promocion_produc,
      imagen_produc,
      fechaReg_produc,
    });
  } catch (error) {
    // res.status(500);
    res.json({msg: 'error'});
  }
};

// Actualizar Productos
export const updateProducto = async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(req.file);
    // console.log(req.body);
    const { producto } = req.body;
    const productoJSon = JSON.parse(producto)
   
    const file = req.file;
    // console.log(file);
    const {
      id_producto,
      nombre_produc,
      cantidad_produc,
      descripcion_produc,
      precio_produc,
      promocion_produc,
      dscpLarga_produc,
      imagen_produc
    } = productoJSon;
   
    //fecha de registro
    const fecha = new Date();
    const fechaReg_produc = fecha.toUTCString();

    //url de la imagen 
    let urlImg = ''
    if(file){
      urlImg = `${process.env.HOST}${file.filename}`
    }else if(imagen_produc == ''){
      urlImg = `${process.env.HOST}no-image.png`;
    }else{
      urlImg = imagen_produc;
    }
    
    
    //guardar en la base de datos
    
      const pool = await getConnection();
      await pool
      .request()
      .input("id_producto", sql.VarChar, id)
      .input("nombre_produc", sql.VarChar, nombre_produc)
      .input("cantidad_produc", sql.Int, cantidad_produc)
      .input("descripcion_produc", sql.VarChar, descripcion_produc)
      .input("precio_produc", sql.Decimal(18, 2), precio_produc)
      .input("promocion_produc", sql.VarChar, promocion_produc)
      .input("dscpLarga_produc", sql.VarChar, dscpLarga_produc)

      .input("fechaReg_produc", sql.SmallDateTime, fechaReg_produc)
      .input("imagen_produc", sql.VarChar, urlImg)

      .query(queries.updateProduct);

    res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
};

// Eliminar Productos
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    const pool = await getConnection();
      await pool
      .request()
      .input("id_produc", id)
      .query(queries.deleteProduct)
      res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }

}