import express from "express";
import checkAuth from '../middleware/checkAuth.js'
import {
  newProject,
  getProjects,
  getProject,
  editProject,
  deleteProject,
  addTeammate,
  searchTeammate,
  removeTeammate,
  getTasks
} from "../controllers/projectController.js";

const router = express.Router();

//POST
router.post('/', checkAuth, newProject)
router.post('/teammates/:id', checkAuth, addTeammate)
router.post('/teammates', checkAuth, searchTeammate)
router.post('/removeteammates/:id', checkAuth, removeTeammate)

//GET
router.get('/', checkAuth, getProjects)
router.get('/:id', checkAuth, getProject)
//router.get('/tasks/:id', checkAuth, getTasks)

//PUT
router.put('/:id', checkAuth, editProject)

//DELETE
router.delete('/:id', checkAuth, deleteProject)

export default router