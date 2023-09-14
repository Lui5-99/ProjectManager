import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";

//POST
const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      const error = new Error('User already exist')
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: userFound,
      });
    }
    const user = new User(req.body);
    user.token = generateId();
    const result = await user.save();
    const resultJson = {
      status: 200,
      message: "User created",
      data: result,
    };
    return res.json(resultJson);
  } catch (error) {
    const resultJson = {
      status: 400,
      message: error.message,
    };
    return res.status(400).json(resultJson);
  }
};

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email }).select("+password");
    //Check if user exist
    if (!userFound) {
      const error = new Error('User doesnt exist')
      return res
        .status(403)
        .json({ status: 403, message: error.message });
    }
    //Check if user is confirmed
    if (!userFound.confirmed) {
      const error = new Error("User dont confirmed")
      return res
        .status(403)
        .json({ status: 403, message: error.message });
    }
    //Check if password is correct
    if (await userFound.validatePassword(password)) {
      return res.status(200).json({
        status: 200,
        message: "Password correct",
        data: {
          _id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          token: generateJWT(userFound._id),
        },
      });
    } else {
      const error = new Error('Password incorrect')
      return res
        .status(401)
        .json({ status: 401, message: error.message });
    }
  } catch (error) {
    return res
        .status(403)
        .json({ status: 403, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    const error = new Error('User doesnt exist')
    return res.status(403).json({ status: 403, message: error.message });
  }
  try {
    userFound.token = generateId();
    const result = await userFound.save();
    return res
      .status(200)
      .json({ status: 200, message: "We've sent an email with instructions" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const userFound = await User.findOne({ token });
  if (!userFound) {
    const error = new Error('Token invalid')
    return res.status(404).json({ status: 404, message: error.message });
  }
  try {
    userFound.password = password;
    userFound.token = "";
    const result = await userFound.save();
    return res
      .status(200)
      .json({ status: 200, message: "Password reset", data: result });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error.message });
  }
};

//GET
const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    const resultJson = {
      status: 200,
      message: "List of users",
      data: result,
    };
    return res.json(resultJson);
  } catch (error) {
    const resultJson = {
      status: 400,
      message: error.message,
    };
    return res.json(resultJson);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = id
    const result = await User.findById(_id);
    const resultJson = {
      status: 201,
      message: "User by Id",
      data: result,
    };
    return res.status(201).json(resultJson);
  } catch (error) {
    const resultJson = {
      status: 400,
      message: error.message,
    };
    return res.status(400).json(resultJson);
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userFound = await User.findOne({ token });
  if (!userFound) {
    const error = new Error('Token invalid')
    return res.status(404).json({ status: 404, message: error.message });
  }
  try {
    userFound.confirmed = true;
    userFound.token = "";
    const result = await userFound.save();
    return res
      .status(200)
      .json({ status: 200, message: "User confirmed", data: result });
  } catch (error) {
    const resultJson = {
      status: 401,
      message: error.message,
    };
    return res.status(401).json(resultJson);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const tokenValid = await User.findOne({ token });
  if (!tokenValid) {
    const error = new Error('Token invalid')
    return res.status(404).json({ status: 404, message: error.message });
  }
  return res
    .status(200)
    .json({ status: 200, message: "Token valid and user found" });
};

const profile = async (req, res) => {
  const { user } = req
  return res.status(200).json({status: 200, message: 'Profile Authenticated', data: user})
}

//PUT
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, email, token, confirmed } = req.body;
    const result = await User.updateOne(
      { _id: id },
      { $set: { name, password, email, token, confirmed } }
    );
    const resultJson = {
      status: 200,
      message: "User updated",
      data: result,
    };
    return res.json(resultJson);
  } catch (error) {
    const resultJson = {
      status: 400,
      message: error.message,
    };
    return res.status(400).json(resultJson);
  }
};

//DELETE
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.remove({ _id: id });
    const resultJson = {
      status: 200,
      message: "User deleted",
      data: result,
    };
    return res.json(resultJson);
  } catch (error) {
    const resultJson = {
      status: 400,
      message: error.message,
    };
    return res.status(400).json(resultJson);
  }
};

export {
  getUsers,
  getUserById,
  confirm,
  checkToken,
  profile,
  resetPassword,
  forgotPassword,
  registerUser,
  auth,
  updateUser,
  deleteUser,
};
