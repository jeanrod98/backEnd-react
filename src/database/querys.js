export const queries = {
  getAllProducts: "SELECT * FROM TMAEPRODUCTO",
  addNewProducts: `INSERT INTO TMAEPRODUCTO (id_producto, nombre_produc, cantidad_produc, descripcion_produc, precio_produc, pesoImg_produc, nombreImg_produc, promocion_produc, imagen_produc, fechaReg_produc) 
    VALUES (@id_producto, @nombre_produc, @cantidad_produc, @descripcion_produc, @precio_produc, @pesoImg_produc, @nombreImg_produc, @promocion_produc, @imagen_produc, @fechaReg_produc)`,
  updateProduct: "UPDATE TMAEPRODUCTO SET id_producto = @id_producto, nombre_produc = @nombre_produc, cantidad_produc = @cantidad_produc, descripcion_produc = @descripcion_produc, precio_produc = @precio_produc, promocion_produc = @promocion_produc, dscpLarga_produc = @dscpLarga_produc, fechaReg_produc = @fechaReg_produc, pesoImg_produc = @pesoImg_produc, nombreImg_produc = @nombreImg_produc, imagen_produc = @imagen_produc WHERE id_producto = @id_producto",

  getProductById: "SELECT * FROM TMAEPRODUCTO WHERE id_producto = @id",
  getAllUsers: "SELECT * FROM TMAEUSUARIO",
  postUsuarioAuth: "SELECT * FROM TMAEUSUARIO WHERE correo_usu=@correo_usu AND contraseña_usu=@contrasenia_usu",
  getUserById: "SELECT * FROM TMAEUSUARIO WHERE id_usuario = @id",

  getAllFacturas: "SELECT * FROM TMAEFACTURA",
  getFacturaById: "SELECT * FROM TMAEFACTURA WHERE id_usuario = @id",
  getAllFacturasPendientes: "SELECT * FROM TMAEFACTURA WHERE estado_fac = 'Pagado (pendiente envío)'",
  updateFacturaPendiente: "UPDATE TMAEFACTURA SET estado_fac = @estado_fac WHERE codigo_fac = @codigo_fac",

  postFactura: `INSERT INTO TMAEFACTURA (id_usuario, url_fac, fechaReg_fac, estado_fac) VALUES (@id_usuario, @url_fac, @fechaReg_fac, @estado_fac);  SELECT SCOPE_IDENTITY() AS [SCOPE_IDENTITY]`,

  postFacturaMov: `INSERT INTO TMOVFACTDETALLE (factura_id, producto_id, cantidad_det, precioUnitario_det, delivery_id) VALUES (@factura_id, @producto_id, @cantidad_det, @precioUnitario_det, @delivery_id)`,

  getIdFactura:'SELECT codigo_fact FROM TMAEFACTURA',

  getDelivery: 'SELECT * FROM TMAEDELIVERY',
  getDeliveryById: 'SELECT * FROM TMAEDELIVERY WHERE id_delivery = @id_delivery',
};
