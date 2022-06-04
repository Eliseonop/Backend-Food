import mongoose from 'mongoose'

const schemaPedido = new mongoose.Schema(
  {
    fecha: {
      // hacer que fecha sea una fecha de ahora
      type: mongoose.Schema.Types.Date,
      required: true
    },

    total: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
      set: function (total) {
        return parseFloat(total).toFixed(2)
      }
    },
    estado: {
      type: mongoose.Schema.Types.String,
      enum: ['PENDIENTE', 'ENVIADO', 'ENTREGADO', 'CANCELADO'],
      default: 'PENDIENTE'
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente'
    },
    productos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Producto'
    }
  },
  { timestamps: true }
)
export const pedidoModel = mongoose.model('Pedido', schemaPedido)
