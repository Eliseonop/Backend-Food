import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const schemaCliente = new mongoose.Schema(
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
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      set: function (password) {
        return bcrypt.hashSync(password, 10)
      }
    },
    fechaNacimiento: {
      type: mongoose.Schema.Types.Date
    },
    pedidos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Pedido'
    }
  },
  { timestamps: true }
)
export const clienteModel = mongoose.model('Cliente', schemaCliente)
