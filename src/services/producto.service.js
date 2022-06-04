import { productoModel } from '../models/producto.model.js'

export class ProductoService {
  static async crearProducto (producto) {
    try {
      const nuevoProducto = await productoModel.create(producto)
      return nuevoProducto
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async actualizarProducto (id, data) {
    try {
      const producto = await productoModel.findByIdAndUpdate(id, data)

      return producto
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async obtenerProductos () {
    try {
      const productos = await productoModel.find().populate('administrador', {
        nombre: 1,
        apellido: 1,
        _id: 0
      })
      return productos
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async obtenerProductoId (id) {
    try {
      const producto = await productoModel
        .findById(id)
        .populate('administrador', { nombre: 1, apellido: 1, _id: 0 })
      return producto
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async eliminarProducto (id) {
    try {
      const producto = await productoModel.findByIdAndDelete(id)
      return [
        {
          message: 'Producto eliminado'
        },
        producto
      ]
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
