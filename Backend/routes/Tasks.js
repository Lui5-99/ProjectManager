import express from "express";
import {
  addTask,
  getTask,
  editTask,
  changeState,
  deleteTask,
} from "../controllers/taskController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//POST
router.post('/', checkAuth, addTask)
router.post('/state/:id', checkAuth, changeState)

//GET
router.get('/:id', checkAuth, getTask)

//UPDATE
router.put('/:id', checkAuth, editTask)

//DELETE
router.delete('/:id', checkAuth, deleteTask)

export default router;
