import { PedidoService } from '../services/pedido.service.js'

export async function crearPedido (req, res) {
  try {
    const nuevoPedido = await PedidoService.crearPedido(req.body)
    return res.status(201).json(nuevoPedido)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al crear el pedido',
      error: error.message
    })
  }
}

export async function actualizarPedido (req, res) {
  try {
    const pedido = await PedidoService.actualizarPedido(req.params.id, req.body)
    return res.status(200).json(pedido)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al actualizar el pedido',
      error: error.message
    })
  }
}

export async function obtenerPedidos (req, res) {
  try {
    const pedidos = await PedidoService.obtenerPedidos()
    return res.status(200).json(pedidos)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener los pedidos',
      error: error.message
    })
  }
}

export async function obtenerPedidoId (req, res) {
  try {
    const pedido = await PedidoService.obtenerPedidoId(req.params.id)
    return res.status(200).json(pedido)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener el pedido',
      error: error.message
    })
  }
}
