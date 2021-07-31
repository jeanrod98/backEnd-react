export const queries = {
  getAllProducts: "SELECT * FROM TMAEPRODUCTO",
  addNewProducts: `INSERT INTO TMAEPRODUCTO (id_producto, nombre_produc, cantidad_produc, descripcion_produc, precio_produc, pesoImg_produc, nombreImg_produc, promocion_produc, imagen_produc, fechaReg_produc) 
    VALUES (@id_producto, @nombre_produc, @cantidad_produc, @descripcion_produc, @precio_produc, @pesoImg_produc, @nombreImg_produc, @promocion_produc, @imagen_produc, @fechaReg_produc)`,
  getProductById: "SELECT * FROM TMAEPRODUCTO WHERE id_producto = @id",
  getAllUsers: "SELECT * FROM TMAEUSUARIO",
  postUsuarioAuth: "SELECT * FROM TMAEUSUARIO WHERE correo_usu=@correo_usu AND contraseña_usu=@contrasenia_usu",
};
