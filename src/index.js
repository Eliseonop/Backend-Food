import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { clienteRouter } from './routes/cliente.routes.js'
import { pedidoRouter } from './routes/pedido.routes.js'
import { AdminRouter } from './routes/administrador.routes.js'
import { productoRouter } from './routes/producto.routes.js'
// import morgan from 'morgan'
const app = express()
const PORT = process.env.PORT || 5000

// Aui van las rutas
// app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la tienda')
})
app.get('/api', (req, res) => {
  // enviar un h1
  res.send(`<h1>Bienvenido a la API de la tienda</h1>
  <h2>
  <a>https://documenter.getpostman.com/view/17188507/Uz5DocEi#80dda58c-902a-4ac6-b063-a64ae14fc971</a></h2>`)
})

app.use('/api', clienteRouter)
app.use('/api', pedidoRouter)
app.use('/api', AdminRouter)
app.use('/api', productoRouter)

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB', mongoose.connection.name)
  } catch (error) {
    console.log(error)
  }
  console.log(`Server started on port ${PORT}`)
})
