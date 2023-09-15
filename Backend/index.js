import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js"
import userRoutes from './routes/User.js'
import projectsRoutes from './routes/Project.js'
import taskRoutes from './routes/Tasks.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

dotenv.config()

connectDB()

//Set Cors
const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function(origin, callback){
    if(whiteList.includes(origin)){
      callback(null, true)
    }
    else{
      callback(new Error('Cors Error'))
    }
  }
}

app.use(cors(corsOptions))

//routing
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/tasks', taskRoutes)



app.listen(PORT, () => {
  console.log("Server running in port", PORT)
})