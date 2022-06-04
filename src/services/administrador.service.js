import { administradorModel } from '../models/administrador.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export class AdministradorService {
  static async crearAdministrador (administrador) {
    try {
      const nuevoAdministrador = await administradorModel.create(administrador)
      const admin = await administradorModel.findById(nuevoAdministrador._id)
      if (!admin) throw new Error('El cliente ya fue')

      const token = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
          nombre: admin.nombre,
          apellido: admin.apellido
        },
        process.env.SECRET_JWT,
        {
          expiresIn: '45h'
        }
      )
      return {
        message: 'ADMINISTRADOR  creado',
        token
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async actualizarAdministrador (id, data) {
    try {
      const administrador = await administradorModel.findByIdAndUpdate(id, data)
      return administrador
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async loginAdmin (email, password) {
    try {
      const cliente = await administradorModel.findOne({ email })
      if (!cliente) throw new Error('El cliente no existe')

      const validPassword = bcrypt.compareSync(password, cliente.password)

      if (!validPassword) throw new Error('Contraseña incorrecta')

      const token = jwt.sign(
        {
          id: cliente._id,
          email: cliente.email,
          nombre: cliente.nombre,
          apellido: cliente.apellido
        },
        process.env.SECRET_JWT,
        {
          expiresIn: '5h'
        }
      )
      return {
        message: 'Login correcto',
        token
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async obtenerAdministradores () {
    try {
      const administradores = await administradorModel.find()
      return administradores
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async obtenerAdministradorId (id) {
    try {
      const administrador = await administradorModel.findById(id)
      return administrador
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
