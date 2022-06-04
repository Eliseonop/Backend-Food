import validator from 'validator'

export function validadorCliente (req, res) {
  const { nombre, apellido, email, password } = req

  if (!validator.isEmail(email)) {
    throw new Error('Correo invalido')
  }

  if (validator.isEmpty(password, { min: 6 })) {
    throw new Error('El password no debe estar vacio')
  }

  if (validator.isEmpty(nombre) || validator.isEmpty(apellido)) {
    throw new Error('El nombre o el apellido no pueden estar vacios')
  }

  return {
    nombre,
    apellido,
    email,
    password
  }
}
