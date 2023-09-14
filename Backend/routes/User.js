import express from "express";
import {
  getUsers,
  getUserById,
  confirm,
  checkToken,
  profile,
  forgotPassword,
  resetPassword,
  registerUser,
  auth,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//POST
router.post("/", registerUser);
router.post("/login", auth);
router.post("/forgotpassword", forgotPassword)
router.post("/forgotpassword/:token", resetPassword)

//GET
router.get("/", getUsers);
//router.get("/:id", getUserById);
router.get("/confirm/:token", confirm);
router.get("/forgotpassword/:token", checkToken)
router.get("/profile", checkAuth, profile)

//PUT
router.put("/:id", updateUser);

//Delete
router.delete("/:id", deleteUser);


export default router;
