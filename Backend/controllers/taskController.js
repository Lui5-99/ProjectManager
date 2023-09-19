import Task from "../models/Task.js";
import Project from "../models/Project.js";

//POST
const addTask = async (req, res) => {
  try {
    const { project } = req.body;
    const isProject = await Project.findById(project);
    if (isProject.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }

    const result = await Task.create(req.body);
    isProject.tasks.push(result._id)
    await isProject.save()
    return res
      .status(201)
      .json({ status: 201, message: "Task created", data: result });
  } catch (error) {
    const errorUser = new Error("Project not found");
    return res.status(404).json({ status: 404, message: errorUser.message });
  }
};

const changeState = async (req, res) => {
  try {
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

//GET
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.findById(id).populate("project");
    if (result.project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }
    return res
      .status(200)
      .json({ status: 200, message: "Task found", data: result });
  } catch (error) {
    const errorUser = new Error("Task not found");
    return res.status(404).json({ status: 404, message: errorUser.message });
  }
};

//UPDATE
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");
    if (task.project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }

    task.name = req.body.name || task.name
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.deadline = req.body.deadline || task.deadline

    const result = await task.save()

    return res
      .status(200)
      .json({ status: 200, message: "Task updated", data: result });

  } catch (error) {
    const errorUser = new Error("Task not found");
    return res.status(404).json({ status: 404, message: errorUser.message });
  }
};

//DELETE
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");
    if (task.project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }

    const result = await Task.deleteOne()

    return res
      .status(200)
      .json({ status: 200, message: "Task deleted", data: result });
  } catch (error) {
    const errorUser = new Error("Task not found");
    return res.status(404).json({ status: 404, message: errorUser.message });
  }
};

export { addTask, getTask, editTask, changeState, deleteTask };
