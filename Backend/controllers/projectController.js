import project from "../models/Project.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

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
    const project = await Project.findById(req.params.id);
    if (!project) {
      const error = new Error("project not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("No valid");
      return res.status(404).json({ status: 404, message: error.message });
    }
    const { email } = req.body;
    const user = await User.findOne({ email }).select(
      "-confirmed -createdAt -password -token -updatedAt -__v"
    );
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.createdBy.toString() === user._id.toString()) {
      const error = new Error("The project creator cannot be a teammate");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.teammates.includes(user._id)) {
      const error = new Error("Teammate already belongs to the project");
      return res.status(404).json({ status: 404, message: error.message });
    }
    project.teammates.push(user._id);
    const result = await project.save();
    return res.status(200).json({
      status: 200,
      message: "Teammate added successfully",
      data: result,
    });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

const searchTeammate = async (req, res) => {
  try {
    const { teammate } = req.body;
    const user = await User.findOne({ email: teammate }).select(
      "-confirmed -createdAt -password -token -updatedAt -__v"
    );
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    return res
      .status(200)
      .json({ status: 200, message: "User found", data: user });
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
};

const removeTeammate = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const error = new Error("project not found");
      return res.status(404).json({ status: 404, message: error.message });
    }
    if (project.createdBy.toString() !== req.user._id.toString()) {
      const error = new Error("No valid");
      return res.status(404).json({ status: 404, message: error.message });
    }
    project.teammates.pull(req.body.id);
    const result = await project.save();
    return res.status(200).json({
      status: 200,
      message: "Teammate removed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

//GET
const getProjects = async (req, res) => {
  try {
    const result = await Project.find({
      $or: [{ teammates: { $in: req.user } }, { createdBy: { $in: req.user } }],
    }).select("-tasks");
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
    const result = await Project.findById(id)
      .populate("tasks")
      .populate("teammates", "name email");
    if (
      result.createdBy.toString() !== req.user._id.toString() &&
      !result.teammates.some(
        (teammate) => teammate._id.toString() === req.user._id.toString()
      )
    ) {
      const error = new Error("Dont have permissions 4 this project");
      return res.status(401).json({ status: 401, message: error.message });
    }
    return res
      .status(200)
      .json({ status: 200, message: "Project found", data: result });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Project not found",
      url: "/projects/:id",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const isProject = await Project.findById(id);
    const tasks = await Task.find().where("project").equals(id);
    return res
      .status(200)
      .json({ status: 200, message: "Tasks found", data: tasks });
  } catch (error) {
    const errorUser = new Error("Project not found");
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

    const result = await project.save();

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
    const result = await project.deleteOne();

    return res
      .status(200)
      .json({ status: 200, message: "Project deleted", data: result });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

export {
  newProject,
  addTeammate,
  searchTeammate,
  getProjects,
  getProject,
  getTasks,
  editProject,
  deleteProject,
  removeTeammate,
};
