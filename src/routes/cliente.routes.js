import { Router } from 'express'
import {
  crearCliente,
  loginCliente,
  actualizarCliente,
  obtenerClientes,
  obtenerClienteId
} from '../controllers/cliente.controller.js'
import { validarUsuario } from '../utils/validador.js'

export const clienteRouter = Router()

clienteRouter.post('/signup', crearCliente)
clienteRouter.post('/signin', loginCliente)
clienteRouter
  .route('/cliente/:id')
  .put(validarUsuario, actualizarCliente)
  .get(obtenerClienteId)
clienteRouter.get('/clientes', obtenerClientes)
