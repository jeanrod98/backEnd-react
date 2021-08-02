export const contenido = (correo = 0) => {
    console.log(correo);
   const contenidoPDF = {
       content: [
        { text: "FACTURA ALMACEN VEICOR", style: "header", alignment: 'center'},
        // {text: 'Datos del Cliente)', style: 'subheader'},
        {
			style: 'tableExample',
			table: {
                widths: [200, 'auto', 'auto'],
				headerRows: 1,
				body: [
					[{text: 'DATOS DE LA EMPRESA', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {}],
					[{text: 'Nombre De La Empresa', style: 'tableHeader', alignment: 'center'}, {text: 'Dirección', style: 'tableHeader', alignment: 'center'}, {text: 'RUC', style: 'tableHeader', alignment: 'center'}],
                    ['Almacen Veicor', 'Manta, Av 4 de noviembre sector la paz', '131531982001'],
                    [{text: 'Gerente / Propietario', style: 'tableHeader', alignment: 'center'}, {text: 'Correo Electónico', style: 'tableHeader', alignment: 'center'}, {text: 'N. Teléfono', style: 'tableHeader', alignment: 'center'}],
                    ['Luis Gonzalo Cool Loor', 'l.gonza.96.l@gmail.com', '0989167751'],
				]
			},
            layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 === 0) ? '#FC9A54' : null;
				}
			}
		},
    ]
}
return contenidoPDF
};