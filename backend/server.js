import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config()

connectDB()
const app = express()

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000


app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} at ${PORT}`.yellow.bold))



app.get('/', (req, res) => {
    res.send("API is running...")
})


