import { Router } from "express";
import "body-parser";
import {
  generarfacturas,
  transaccion,
  consultarFacturas,
  consultarFacturaById,
  consultarFacturasPendientes,
  updateEstadoFactura,
} from "../controllers/facturas.controller";

const router = Router();

//Rutas del CRUD para las facturas
router.get("/facturas", consultarFacturas);

//factura por id de factura
router.get("/facturas/:id", consultarFacturaById);

// insertar factura modulo de Facturacion
router.post("/facturas", generarfacturas);

//generar pago y factura tienda online
router.post("/transaccion", transaccion);

//consultar facturas pendientes de envio por delivery
router.get("/facturas-pendientes", consultarFacturasPendientes);

//actualizar estado de la factura pendiente entrega
router.put("/estado-factura/:id", updateEstadoFactura);

// router.delete('/usuarios', );

// router.put('/usuarios', );

export default router;
