import PdfPrinter from "pdfmake";
import fs from 'fs';

import fonts from '../facturacion/fonts'
import styles from "../facturacion/styles";
import {contenido} from "../facturacion/pdfContent"

export const generarfacturas = async (req, res) => {
const result = contenido(req.body.correo_usu)
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
        pdfDoc.end()
        // console.log(printer);
        
        res.json({msg: "se creo el pdf"});
    } catch (error) {
        console.log("no se creo el pdf");
        res.json({msg: "NO se creo el pdf"});
        
    }

};

// transaccion 
export const transaccion = async (req, res) => {
    // console.log(req.body.contrasenia_usu)
    // se valida la transaccion 
    
    
    
    
    
    //captura los datos del usuario, los envia a la facturacion y optiene los datos de la factura
    const result = contenido(req.body.contrasenia_usu)
    //se crea el pdf con la factura
    try {
        // contenido(req.body.correo_usu)
        let docDefinition = {
            content: result.content,
            styles: styles,
        
        };
        
        const printer = await new PdfPrinter(fonts);
        
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream("public/pdfs/pdfTest01.pdf"));
        pdfDoc.end()
        // console.log(printer);
        
        res.json({msg: "se creo el pdf"});
    } catch (error) {
        console.log("no se creo el pdf");
        res.json({msg: "NO se creo el pdf"});
        
    }

    

};