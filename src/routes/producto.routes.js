import { Router } from 'express'
import {
  actualizarProducto,
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  obtenerProductoId
} from '../controllers/producto.controller.js'
import { validarClientOrAdmin, validarAdmin } from '../utils/validador.js'
export const productoRouter = Router()

productoRouter.route('/productos').post(validarAdmin, crearProducto)
productoRouter.get('/productos', obtenerProductos)
productoRouter
  .route('/producto/:id', validarAdmin)
  .put(validarAdmin, actualizarProducto)
  .delete(validarAdmin, eliminarProducto)
  .get(obtenerProductoId)
