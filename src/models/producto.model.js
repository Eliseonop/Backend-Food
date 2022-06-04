import mongoose from 'mongoose'

const schemaProducto = new mongoose.Schema(
  {
    nombre: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    precio: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
      set: function (precio) {
        return parseFloat(precio).toFixed(2)
      }
    },
    descripcion: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    imagen: {
      type: mongoose.Schema.Types.String,
      default: 'https://via.placeholder.com/150'
      // required: true
    },
    tipo: {
      type: mongoose.Schema.Types.String,
      enum: ['PLATO', 'BEBIDA', 'POSTRE', 'OTRO'],
      default: 'OTRO'
      // required: true
    },
    estado: {
      type: mongoose.Schema.Types.Boolean,
      default: true
    },
    administrador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Administrador'
    }
  },
  { timestamps: true }
)

export const productoModel = mongoose.model('Producto', schemaProducto)
