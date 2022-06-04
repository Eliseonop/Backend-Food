import { AdministradorService } from '../services/administrador.service.js'

export async function crearAdministrador (req, res) {
  try {
    const nuevoAdministrador = await AdministradorService.crearAdministrador(
      req.body
    )
    res.status(201).json(nuevoAdministrador)
  } catch (error) {
    res.status(400).json({
      message: 'Error al crear el administrador',
      error: error.code === 11000 ? 'El cliente ya existe' : error.message
    })
  }
}

export async function loginAdministrador (req, res) {
  try {
    const { email, password } = req.body
    const administrador = await AdministradorService.loginAdmin(email, password)
    return res.status(200).json(administrador)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al loguearse desde administrador',
      error: error.message
    })
  }
}

export async function actualizarAdministrador (req, res) {
  try {
    const administrador = await AdministradorService.actualizarAdministrador(
      req.params.id,
      req.body
    )
    return res.status(200).json(administrador)
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el administrador',
      error: error.message
    })
  }
}
