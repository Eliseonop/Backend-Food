import { Router } from 'express'
import {
  actualizarPedido,
  crearPedido,
  obtenerPedidoId,
  obtenerPedidos
} from '../controllers/pedido.controller.js'
import {
  validarAdmin,
  validarUsuario,
  validarClientOrAdmin
} from '../utils/validador.js'
export const pedidoRouter = Router()

pedidoRouter.route('/pedidos').post(validarUsuario, crearPedido)
pedidoRouter.get('/pedidos', obtenerPedidos)
pedidoRouter
  .route('/pedidos/:id')
  .put(validarClientOrAdmin, actualizarPedido)
  .get(obtenerPedidoId)
