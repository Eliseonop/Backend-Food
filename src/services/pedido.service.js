import { pedidoModel } from '../models/pedido.model.js'
import { clienteModel } from '../models/cliente.model.js'
import { productoModel } from '../models/producto.model.js'

export class PedidoService {
  static async crearPedido (pedido) {
    try {
      // sumar el precio de los productos y agregar al total de pedido
      const { productos } = pedido
      const productosEncontrados = await Promise.all(
        productos.map(async producto => {
          const productoEncontrado = await productoModel.findById(producto)
          return productoEncontrado
        })
      )

      console.log(productosEncontrados.includes(null))
      const total = productosEncontrados.reduce((total, producto) => {
        return total + producto.precio
      }, 0)
      pedido.fecha = new Date()

      pedido.total = parseFloat(total.toFixed(2))

      const nuevoPedido = await pedidoModel.create(pedido)

      const cliente = await clienteModel.findByIdAndUpdate(pedido.cliente, {
        $push: { pedidos: nuevoPedido._id }
      })
      // console.log(cliente)

      return nuevoPedido
    } catch (error) {
      console.log(error)
      throw new Error({
        message: 'Error al crear el pedido',
        error
      })
    }
  }
  static async actualizarPedido (id, data) {
    try {
      const { estado } = data
      const usuario = await clienteModel.findById(data.cliente)
      console.log(usuario)
      if (usuario && estado && estado != 'CANCELADO') {
        throw new Error('No puedes actualizar el estado a ese como cliente')
      }
      console.log(data)
      const estadosAdmin = ['PENDIENTE', 'ENVIADO', 'ENTREGADO', 'CANCELADO']
      if (estado) {
        if (!estadosAdmin.includes(estado)) {
          throw new Error('El estado no es válido')
        }
      }
      const pedido = await pedidoModel.findByIdAndUpdate(id, data)
      if (!pedido) throw new Error('El pedido no existe')
      const pedidoActualizado = await pedidoModel.findById(id)
      return pedidoActualizado
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async obtenerPedidos () {
    try {
      const pedidos = await pedidoModel
        .find()
        .populate('cliente', {
          nombre: 1,
          apellido: 1,
          email: 1,
          id: 1
        })
        .populate('productos', {
          nombre: 1,
          precio: 1,
          id: 1
        })
      return pedidos
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async obtenerPedidoId (id) {
    try {
      const pedido = await pedidoModel
        .findById(id)
        .populate('cliente', {
          nombre: 1,
          apellido: 1,
          email: 1
        })
        .populate('productos', {
          nombre: 1,
          precio: 1,
          imagen: 1
        })
      return pedido
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
