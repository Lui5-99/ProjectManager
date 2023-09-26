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

//GET
router.get('/', checkAuth, getProjects)
router.get('/:id', checkAuth, getProject)
//router.get('/tasks/:id', checkAuth, getTasks)

//PUT
router.put('/:id', checkAuth, editProject)

//DELETE
router.delete('/:id', checkAuth, deleteProject)
router.delete('/teammates/:id', checkAuth, removeTeammate)

export default router