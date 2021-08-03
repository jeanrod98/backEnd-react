import PdfPrinter from "pdfmake";
import fs from "fs";

import fonts from "../facturacion/fonts";
import styles from "../facturacion/styles";
import { contenido } from "../facturacion/pdfContent";

// Importamos la base de datos
import { getConnection, sql, queries } from "../database";

import "dotenv";
import { URL } from "url";

export const generarfacturas = async (req, res) => {
  const result = contenido(req.body.correo_usu);
  // console.log(result);
  try {
    // contenido(req.body.correo_usu)
    let docDefinition = {
      content: result.content,
      styles: styles,
    };

    const printer = await new PdfPrinter(fonts);

    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream("public/pdfs/pdfTest.pdf"));
    pdfDoc.end();
    // console.log(printer);

    res.json({ msg: "se creo el pdf" });
  } catch (error) {
    console.log("no se creo el pdf");
    res.json({ msg: "NO se creo el pdf" });
  }
};

// transaccion
export const transaccion = async (req, res) => {
  // console.log(req.body.contrasenia_usu)
  // se valida la transaccion

  const {
    nombre_cli,
    id_usuario,
    direccion_cli,
    celular_cli,
    productos,
    subTotal_produc,
    total_produc,
    delivery_id,
  } = req.body;

  //!validar que los campos existan
  if (
    id_usuario == null ||
    direccion_cli == null ||
    celular_cli == null ||
    subTotal_produc == null ||
    total_produc == null ||
    productos.length <= 0 ||
    delivery_id == null ||
    nombre_cli == null
  ) {
    return res.status(400).json({ msg: "Por favor envíe todos los datos." });
  }
  //Forma de pago

  //captura los datos del usuario, los envia a la facturacion y optiene los datos de la factura
  const result = contenido(
    nombre_cli,
    id_usuario,
    direccion_cli,
    celular_cli,
    productos,
    subTotal_produc,
    total_produc,
    delivery_id
  );
  //validamos el estado de la factura
  let estadoFactura = "";

  if (delivery_id == 1) {
    estadoFactura = "Pagado (pendiente envío)";
  } else {
    estadoFactura = "Pagado (sin envío)";
  }
  //se crea el pdf con la factura
  try {
    // contenido(req.body.correo_usu)
    let docDefinition = {
      content: result.content,
      styles: styles,
    };

    const printer = await new PdfPrinter(fonts);

    let nombrePDF = new Date().getTime();

    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`public/pdfs/${nombrePDF}.pdf`));
    pdfDoc.end();
    // console.log(printer);

    // *generamos la url de la factura
    const URLFACT = `${process.env.HOST}${nombrePDF}.pdf`;

    //Obtenemos la fecha actual
    const fecha = new Date();
    const fechaReg_fac = fecha.toUTCString();

    // console.log(estadoFactura);

    // Inserta los datos de la factura en la base de datos
    // TMAEFACTURA

    // try {
    // !GUARDAMOS EN LA TABLA DE FACTURA Y MOVDETALLEFACTURA
    //llamamos la conexion que retorna el pool
    const pool = await getConnection();
    const respuesta = await pool
      .request()
      // .input("codigo_fac", sql.VarChar, id_producto)
      .input("id_usuario", sql.VarChar, id_usuario)
      .input("url_fac", sql.VarChar, URLFACT)
      .input("fechaReg_fac", sql.SmallDateTime, fechaReg_fac)
      .input("estado_fac", sql.VarChar, estadoFactura)

      .query(queries.postFactura);
    // Capturamos el id del registro
    // console.log();
    const id_factura = respuesta.recordset[0].SCOPE_IDENTITY;
    //Insertamos en TMOVDETALLEFAC
    productos.map((producto) => {
        // const pool = getConnection();
         pool
        .request()
        // .input("codigo_fac", sql.VarChar, id_producto)
        .input("factura_id", sql.Int, id_factura)
        .input("producto_id", sql.VarChar, producto.id_producto)
        .input("cantidad_det", sql.Int, producto.cantidad_produc)
        .input(
          "precioUnitario_det",
          sql.Decimal(18, 2),
          producto.precioUnit_produc
        )
        .input("delivery_id", sql.VarChar, delivery_id)

        .query(queries.postFacturaMov);
    });

    //*ENVIAMOS EL LINK DEL PDF AL FRONTEND
    // console.log('se ejecuta');
    res.json({ url: URLFACT});

    

    // res.json({ msg: URLFACT });
  } catch (error) {
    // console.log("no se creo el pdf");
    res.status(500);
    res.send(error.message);
  }
};
