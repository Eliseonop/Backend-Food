import jwt from 'jsonwebtoken'
import { clienteModel } from '../models/cliente.model.js'
import { administradorModel } from '../models/administrador.model.js'
export function verificarToken (token) {
 
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT)
    return payload
  } catch (error) {
    return error
  }
}

export async function validarUsuario (req, res, next) {
  // middleware
  // es un intermediario entre el cliente y el controlador final
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Se necesita una token para realizar esta solicitud'
    })
  }

  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  const resultado = verificarToken(token)

  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({
      message: 'La token es invalida, intente nuevamente',
      razon: resultado.message
    })
  }

  console.log('hola', resultado)

  const user = await clienteModel.findById(resultado.id)
  // como ya tengo el id (resultado.id) del usuario ahora buscaremos ese usuario en la bd y lo agregaremos al req.user
  if (!user) {
    return res.status(403).json({
      message: 'No tiene los permisos necesarios'
    })
  }
  req.body = { ...req.body, cliente: user.id }

  console.log(req.body)
  next()
}

export async function validarAdmin (req, res, next) {
  // middleware
  // es un intermediario entre el cliente y el controlador final
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Se necesita una token para realizar esta solicitud'
    })
  }

  const token = req.headers.authorization.split(' ')[1]
  console.log(req.headers.authorization)
  const resultado = verificarToken(token)
  console.log(resultado)
  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({
      message: 'La token es invalida, intente nuevamente',
      razon: resultado.message
    })
  }

  console.log('admin', resultado)

  const admin = await administradorModel.findById(resultado.id)
  // como ya tengo el id (resultado.id) del usuario ahora buscaremos ese usuario en la bd y lo agregaremos al req.user
  if (!admin) {
    return res.status(403).json({
      message: 'No tiene los permisos necesarios'
    })
  }
  req.body = { ...req.body, administrador: admin.id }

  console.log(req.body)
  next()
}

export async function validarClientOrAdmin (req, res, next) {
  // middleware
  // es un intermediario entre el cliente y el controlador final
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Se necesita una token para realizar esta solicitud'
    })
  }

  const token = req.headers.authorization.split(' ')[1].replace(/['"]+/g, '')

  const resultado = verificarToken(token)

  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({
      message: 'La token es invalida, intente nuevamente',
      razon: resultado.message
    })
  }

  console.log('hola', resultado)

  const user = await clienteModel.findById(resultado.id)
  // como ya tengo el id (resultado.id) del usuario ahora buscaremos ese usuario en la bd y lo agregaremos al req.user
  if (!user) {
    const admin = await administradorModel.findById(resultado.id)
    // como ya tengo el id (resultado.id) del usuario ahora buscaremos ese usuario en la bd y lo agregaremos al req.user
    if (!admin) {
      return res.status(403).json({
        message: 'No tiene los permisos necesarios'
      })
    }
    req.body = { ...req.body, administrador: admin.id }
  } else {
    req.body = { ...req.body, cliente: user.id }
  }

  console.log(req.body)
  next()
}
