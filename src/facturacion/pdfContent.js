import path from "path";

import { img } from "./img";
export const contenido = (
  nombre_cli = "000000",
  id_usuario = "000000",
  direccion_cli = "000000",
  celular_cli = "000000",
  carrito = [
    {
      id_producto: "00000",
      nombre_produc: "00000",
      cantidad_produc: 0,
      precioUnit_produc: 0,
    },
  ],
  subTotal_produc = "000000",
  total_produc = "000000",
  delivery_precio = "000000"
) => {
  // Delivery si es 0 es NO si es 1 es SI y cambia el estado de la factura dependiendo del delivery
  // let delivery = "";
  let estado_fac = "";

  if (delivery_precio > 0) {
    // delivery = "Sí";
    estado_fac = "Pagado (pendiente envío)";
  } else {
    // delivery = "No";
    estado_fac = "Pagado (sin envío)";
  }

  //guardamos todos los productos a mostrar en la factura
  let producto_carrito = "";
  //recorrer el carrito para sacar los productos
  carrito.forEach(function (producto) {
    producto_carrito += `#Código: ${producto.id_producto} || Nombre Producto: ${producto.nombre_produc} || Cantidad: ${producto.cantidad_producto} || Precio Unitario: ${producto.precio_produc}\n\n`;
  });
  // console.log(producto_carrito);
  // console.log(__dirname.);
  // Diseño del pdf
  const contenidoPDF = {
    content: [
      {
        image: img,
        width: 100,
        alignment: "center",
      },

      { text: "FACTURA ALMACEN VEICOR", style: "header", alignment: "center" },
      // {text: 'Datos del Cliente)', style: 'subheader'},
      {
        style: "tableExample",
        // fillColor: '#dedede',
        table: {
          style: "contenido",
          widths: [200, "auto", "auto", "auto"],
          headerRows: 1,
          body: [
            [
              {
                text: "DATOS DE LA EMPRESA",
                style: "tableHeader",
                colSpan: 4,
                alignment: "center",
              },
              {},
              {},
              {},
            ],
            [
              {
                text: "Nombre De La Empresa",
                style: "tableHeader",
                alignment: "center",
              },
              { text: "Dirección", style: "tableHeader", alignment: "center" },
              { text: "RUC", style: "tableHeader", alignment: "center" },
              {},
            ],
            [
              "Almacen Veicor",
              "Manta, Av 4 de noviembre sector la paz",
              "131531982001",
              "",
            ],
            [
              {
                text: "Gerente / Propietario",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "Correo Electónico",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "N. Teléfono",
                style: "tableHeader",
                alignment: "center",
              },
              {},
            ],
            [
              "Luis Gonzalo Cool Loor",
              "l.gonza.96.l@gmail.com",
              "0989167751",
              "",
            ],
            [
              {
                text: "DATOS DEL CLIENTE",
                style: "tableHeader",
                colSpan: 4,
                alignment: "center",
              },
              {},
              {},
              {},
            ],
            [
              { text: "Nombres", style: "tableHeader", alignment: "center" },
              { text: "Cédula", style: "tableHeader", alignment: "center" },
              { text: "Dirección", style: "tableHeader", alignment: "center" },
              { text: "Teléfono", style: "tableHeader", alignment: "center" },
            ],
            [nombre_cli, id_usuario, direccion_cli, celular_cli],
            [
              {
                text: "DETALLE DE LA FACTURA",
                style: "tableHeader",
                colSpan: 4,
                alignment: "center",
              },
              {},
              {},
              {},
            ],
            // [{text: 'Código', style: 'tableHeader', alignment: 'center'}, {text: 'Nombre Producto', style: 'tableHeader', alignment: 'center'}, {text: 'Cantidad', style: 'tableHeader', alignment: 'center'}, {text: 'Precio Unit.', style: 'tableHeader', alignment: 'center'}],

            // carrito.map( function (producto)  {
            // 	const codigo = producto.id_producto
            // 	const nombre = producto.nombre_produc
            // 	const cantidad = producto.cantidad_produc
            // 	const precio = producto.precioUnit_produc

            // 	// console.log(codigo);
            [
              {
                text: producto_carrito,
                style: "productos",
                colSpan: 4,
                alignment: "start",
              },
              {},
              {},
              {},
            ],

            // }),
            [
              {
                text: "Estado de Factura",
                style: "tableHeader",
                alignment: "start",
              },
              { text: "Delivery", style: "tableHeader", alignment: "start" },
              { text: "SUBTOTAL", style: "tableHeader", alignment: "start" },
              { text: "TOTAL", style: "tableHeader", alignment: "start" },
            ],
            [estado_fac, delivery_precio, subTotal_produc, total_produc],
          ],
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex % 2 === 0 ? "#FFDAB9" : null;
          },
        },
      },
    ],
  };
  return contenidoPDF;
};
