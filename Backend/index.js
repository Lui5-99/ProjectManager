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
const whiteList = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_NETWORK]

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



const server = app.listen(PORT, () => {
  console.log("Server running in port", PORT)
})

//Socket IO
import { Server } from "socket.io"

const io = new Server(server, {
  pingTimeout: 60000,
  cors:{
    origin: process.env.FRONTEND_URL,
  },
})

io.on('connection', socket => {
  console.log('Connect to socket.io')

  socket.on('openProject', (project) => {
    socket.join(project)
  })

  socket.on('newTask', (task) => {
    const project = task.project
    socket.to(project).emit('taskAdd', task)
  })

  socket.on('removeTask', (task) => {
    const project = task.project
    socket.to(project).emit('taskDeleted', task)
  })

  socket.on('editTask', (task) => {
    const project = task.project
    socket.to(project).emit('taskUpdated', task)
  })

  socket.on('changeState', (task) => {
    const project = task.project
    socket.to(project).emit('taskComplete', task)
  })
})