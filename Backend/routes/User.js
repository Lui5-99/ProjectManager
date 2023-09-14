import express from "express";
import {
  getUsers,
  getUser,
  confirm,
  checkToken,
  forgotPassword,
  registerUser,
  auth,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

//Create
router.post("/", registerUser);
router.post("/login", auth);
router.post("/forgotpassword", forgotPassword)

//Read
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/confirm/:token", confirm);
router.get("/forgotpassword/:token", checkToken)

//Update
router.put("/:id", updateUser);

//Delete
router.delete("/:id", deleteUser);


export default router;
