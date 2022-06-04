import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const schemaAdministrador = new mongoose.Schema(
  {
    nombre: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    apellido: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      set: function (password) {
        return bcrypt.hashSync(password, 10)
      }
    },
    documento: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    productos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Producto'
    },
    pedidos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Pedido'
    }
  },
  { timestamps: true }
)

export const administradorModel = mongoose.model(
  'Administrador',
  schemaAdministrador
)
