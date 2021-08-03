export const queries = {
  getAllProducts: "SELECT * FROM TMAEPRODUCTO",
  addNewProducts: `INSERT INTO TMAEPRODUCTO (id_producto, nombre_produc, cantidad_produc, descripcion_produc, precio_produc, pesoImg_produc, nombreImg_produc, promocion_produc, imagen_produc, fechaReg_produc) 
    VALUES (@id_producto, @nombre_produc, @cantidad_produc, @descripcion_produc, @precio_produc, @pesoImg_produc, @nombreImg_produc, @promocion_produc, @imagen_produc, @fechaReg_produc)`,
  getProductById: "SELECT * FROM TMAEPRODUCTO WHERE id_producto = @id",
  getAllUsers: "SELECT * FROM TMAEUSUARIO",
  postUsuarioAuth: "SELECT * FROM TMAEUSUARIO WHERE correo_usu=@correo_usu AND contraseña_usu=@contrasenia_usu",
  postFactura: `INSERT INTO TMAEFACTURA (id_usuario, url_fac, fechaReg_fac, estado_fac) VALUES (@id_usuario, @url_fac, @fechaReg_fac, @estado_fac);  SELECT SCOPE_IDENTITY() AS [SCOPE_IDENTITY]`,

  postFacturaMov: `INSERT INTO TMOVFACTDETALLE (factura_id, producto_id, cantidad_det, precioUnitario_det, delivery_id) VALUES (@factura_id, @producto_id, @cantidad_det, @precioUnitario_det, @delivery_id)`,

  getIdFactura:'SELECT codigo_fact FROM TMAEFACTURA',
};
