import Project from "../models/Project.js";
import Task from "../models/Task.js"

//POST
const newProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    project.createdBy = req.user._id;
    const result = await project.save();
    return res
      .status(201)
      .json({ status: 201, message: "Project created", data: result });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

const addTeammate = async (req, res) => {
  try {
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

//GET
const getProjects = async (req, res) => {
  try {
    const result = await Project.find().where("createdBy").equals(req.user._id);
    return res
      .status(200)
      .json({ status: 200, message: "List of all projects", data: result });
  } catch (error) {
    return res
      .status(403)
      .json({ status: 403, message: error.message, url: "/projects" });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findById(id);
    if (result.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }
    const tasks = await Task.find().where('project').equals(result._id)
    return res
      .status(200)
      .json({ status: 200, message: "Project found", data: {project: result, tasks} });
  } catch (error) {
    return res
      .status(404)
      .json({
        status: 404,
        message: "Project not found",
        url: "/projects/:id",
      });
  }
};

const getTasks = async (req, res) => {
  try {
    const { id } = req.params
    const isProject = await Project.findById(id)
    const tasks = await Task.find().where('project').equals(id)
    return res.status(200).json({status: 200, message: "Tasks found", data: tasks})
  } catch (error) {
    const errorUser = new Error('Project not found')
    return res.status(404).json({ status: 404, message: errorUser.message });
  }
};

//PUT
const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id.toString() });
    if (!project) {
      const error = new Error("Project not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }

    project.name = req.body.name || project.name; 
    project.description = req.body.description || project.description; 
    project.deadline = req.body.deadline || project.deadline; 
    project.client = req.body.client || project.client; 

    const result = await project.save()

    return res
      .status(200)
      .json({ status: 200, message: "Project found", data: result });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

//DELETE
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id.toString() });
    if (!project) {
      const error = new Error("Project not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }
    const result = await project.deleteOne()

    return res
      .status(200)
      .json({ status: 200, message: "Project deleted", data: result });
    
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

const removeTeammate = async (req, res) => {
  try {
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

export {
  newProject,
  addTeammate,
  getProjects,
  getProject,
  getTasks,
  editProject,
  deleteProject,
  removeTeammate,
};
