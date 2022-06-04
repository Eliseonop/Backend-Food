import { Router } from 'express'
import {
  crearAdministrador,
  loginAdministrador
} from '../controllers/administrador.controller.js'

export const AdminRouter = Router()

AdminRouter.route('/loginadmin').post(loginAdministrador)

AdminRouter.post('/newadmin', crearAdministrador)
