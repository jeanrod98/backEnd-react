import PdfPrinter from "pdfmake";
import fs from "fs";

import fonts from "../facturacion/fonts";
import styles from "../facturacion/styles";
import { contenido } from "../facturacion/pdfContent";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.PRIVATE_PK_STRIPE);

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

  // se valida la transaccion

  const {
    nombre_cli,
    id_usuario,
    direccion_cli,
    celular_cli,
    productos,
    subTotal_produc,
    total_produc,
    delivery_precio,
    id_transaccion, 
    amount
  } = req.body;

  //!validar que los campos existan
  if (
    id_usuario == null ||
    direccion_cli == null ||
    celular_cli == null ||
    subTotal_produc == null ||
    total_produc == null ||
    productos.length <= 0 ||
    delivery_precio == null ||
    nombre_cli == null ||
    id_transaccion == null ||
    amount == null
  ) {
    return res.status(400).json({ msg: "Por favor envíe todos los datos." });
  }
  try {
  //!Forma de pago
  console.log(nombre_cli,
    id_usuario,
    direccion_cli,
    celular_cli,
    productos,
    subTotal_produc,
    total_produc,
    delivery_precio, 
    id_transaccion,
    amount);
    //Stripe
   const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Pagos Almacen Veicor WEB",
      payment_method: id_transaccion,
      confirm: true

    })
    // console.log(payment);
    // validar el pago para emitir la factura 
    if(payment){
//!facturacion
  //captura los datos del usuario, los envia a la facturacion y optiene los datos de la factura
  // const result = contenido(
  //   nombre_cli,
  //   id_usuario,
  //   direccion_cli,
  //   celular_cli,
  //   productos,
  //   subTotal_produc,
  //   total_produc,
  //   delivery_precio
  // );
  // //validamos el estado de la factura
  // let estadoFactura = "";
  // let delivery_id = null;

  // if (delivery_precio > 0) {
  //   estadoFactura = "Pagado (pendiente envío)";
  //  delivery_id = 1
  // } else {
  //   estadoFactura = "Pagado (sin envío)";
  //  delivery_id = 0
  // }
  //*se crea el pdf con la factura

    // let docDefinition = {
    //   content: result.content,
    //   styles: styles,
    // };

    // const printer = await new PdfPrinter(fonts);

    // let nombrePDF = new Date().getTime();

    // let pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream(`public/pdfs/${nombrePDF}.pdf`));
    // pdfDoc.end();


    // // *generamos la url de la factura
    // const URLFACT = `${process.env.HOST}${nombrePDF}.pdf`;

    // //Obtenemos la fecha actual
    // const fecha = new Date();
    // const fechaReg_fac = fecha.toUTCString();

 
    // // !GUARDAMOS EN LA TABLA DE FACTURA Y MOVDETALLEFACTURA
    // //llamamos la conexion que retorna el pool
    // const pool = await getConnection();
    // const respuesta = await pool
    //   .request()

    //   .input("id_usuario", sql.VarChar, id_usuario)
    //   .input("url_fac", sql.VarChar, URLFACT)
    //   .input("fechaReg_fac", sql.SmallDateTime, fechaReg_fac)
    //   .input("estado_fac", sql.VarChar, estadoFactura)

    //   .query(queries.postFactura);
    // // Capturamos el id del registro
 
    // const id_factura = respuesta.recordset[0].SCOPE_IDENTITY;
    // //Insertamos en TMOVDETALLEFAC
    // productos.map((producto) => {

    //      pool
    //     .request()
    //     .input("factura_id", sql.Int, id_factura)
    //     .input("producto_id", sql.VarChar, producto.id_producto)
    //     .input("cantidad_det", sql.Int, producto.cantidad_produc)
    //     .input(
    //       "precioUnitario_det",
    //       sql.Decimal(18, 2),
    //       producto.precioUnit_produc
    //     )
    //     .input("delivery_id", sql.VarChar, delivery_id)

    //     .query(queries.postFacturaMov);
    // });

    // //*ENVIAMOS EL LINK DEL PDF AL FRONTEND
   
    // res.json({ url: URLFACT});

    }
    // res.json({msg: 'Pago Exitoso!!'})
  
    

    // res.json({ msg: URLFACT });
  } catch (error) {
    // console.log("no se creo el pdf");
    // res.status(500);
    // res.send(error.message);
    res.json({message: error.raw.message, pdfMessge: "ErrorPDF014"})
  }


};
