import { ProductoService } from '../services/producto.service.js'

export async function crearProducto (req, res) {
  try {
    const nuevoProducto = await ProductoService.crearProducto(req.body)
    return res.status(201).json(nuevoProducto)
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el producto',
      error: error.message
    })
  }
}

export async function actualizarProducto (req, res) {
  try {
    const producto = await ProductoService.actualizarProducto(
      req.params.id,
      req.body
    )
    const productoActualizado = await ProductoService.obtenerProductoId(
      producto._id
    )
    return res.status(200).json(productoActualizado)
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el producto',
      error: error.message
    })
  }
}
export async function obtenerProductos (req, res) {
  try {
    const productos = await ProductoService.obtenerProductos()
    return res.status(200).json(productos)
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los productos',
      error: error.message
    })
  }
}

export async function obtenerProductoId (req, res) {
  try {
    const producto = await ProductoService.obtenerProductoId(req.params.id)
    if (!producto) throw new Error('No existe el producto')
    return res.status(200).json(producto)
  } catch (error) {
    return res.status(404).json({
      message: 'Error al obtener el producto',
      error: error.message
    })
  }
}
export async function eliminarProducto (req, res) {
  try {
    const producto = await ProductoService.eliminarProducto(req.params.id)
    return res.status(200).json(producto)
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el producto',
      error: error.message
    })
  }
}
