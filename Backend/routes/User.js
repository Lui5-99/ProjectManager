import express from "express";
import {
  getUsers,
  getUser,
  confirm,
  registerUser,
  auth,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

//Create
router.post("/", registerUser);

//Read
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/confirm/:token", confirm);

//Update
router.put("/:id", updateUser);

//Delete
router.delete("/:id", deleteUser);

//Auth
router.post("/login", auth);

export default router;
