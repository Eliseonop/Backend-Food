import { ClienteService } from '../services/cliente.service.js'
import { validadorCliente } from '../tools/cliente.dto.js'

export async function crearCliente (req, res) {
  try {
    const { nombre, apellido, email, password } = validadorCliente(
      req.body,
      res
    )

    const nuevoCliente = await ClienteService.signupCliente({
      nombre,
      apellido,
      email,
      password
    })

    return res.status(201).json(nuevoCliente)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al crear el cliente',

      error: error.code === 11000 ? 'El cliente ya existe' : error.message
    })
  }
}
export async function loginCliente (req, res) {
  try {
    const { email, password } = req.body
    const cliente = await ClienteService.loginCliente(email, password)
    return res.status(200).json(cliente)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al loguearse xd ',
      error: error.message
    })
  }
}
export async function actualizarCliente (req, res) {
  try {
    const { password, nombre, apellido } = req.body
    const cliente = await ClienteService.actualizarCliente(req.params.id, {
      password,
      nombre,
      apellido
    })

    console.log(req.body, req.params.id)
    return res.status(200).json(cliente)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al actualizar el cliente',
      error: error.message
    })
  }
}
export async function obtenerClientes (req, res) {
  try {
    const clientes = await ClienteService.obtenerClientes()
    return res.status(200).json(clientes)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener los clientes',
      error: error.message
    })
  }
}
export async function obtenerClienteId (req, res) {
  try {
    const cliente = await ClienteService.obtenerClienteId(req.params.id)
    return res.status(200).json(cliente)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener el cliente',
      error: error.message
    })
  }
}
