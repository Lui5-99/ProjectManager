import { Schema, model, Types } from "mongoose";

const ProjectSchema = Schema({
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
  deadline: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    trim: true,
    require: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }
  ],
  teammates: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true
});

const project = model('Project', ProjectSchema)

export default project
