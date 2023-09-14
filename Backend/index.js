import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import userRoutes from './routes/User.js'
import projectsRoutes from './routes/Project.js'
import taskRoutes from './routes/Tasks.js'

const app = express()
const PORT = process.env.PORT || 4000

dotenv.config()

//middleware
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/tasks', taskRoutes)

//routes
app.get('/', (req, res) => {
  res.json({message: "Welcome 2 my API"})
})

connectDB()

app.listen(PORT, () => {
  console.log("Server running in port", PORT)
})