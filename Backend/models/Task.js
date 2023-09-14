import { Schema, model } from "mongoose";

const taskSchema = Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
  state: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    default: Date.now()
  },
  priority: {
    type: String,
    require: true,
    enum: ['Low', 'Medium', 'High']
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
},{
  timestamps: true
})

const Task = model('Task', taskSchema)
export default Task