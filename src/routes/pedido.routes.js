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

pedidoRouter.route('/newpedido').post(validarUsuario, crearPedido)
pedidoRouter.get('/pedidos', obtenerPedidos)
pedidoRouter
  .route('/pedido/:id')
  .put(validarClientOrAdmin, actualizarPedido)
  .get(obtenerPedidoId)
