import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import userRoutes from './routes/User.js'

const app = express()
const PORT = process.env.PORT || 4000

dotenv.config()

//middleware
app.use(express.json())
app.use('/api/users', userRoutes)

//routes
app.get('/', (req, res) => {
  res.json({message: "Welcome 2 my API"})
})

connectDB()

app.listen(PORT, () => {
  console.log("Server running in port", PORT)
})