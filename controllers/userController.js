const { User } = require("../models");
const db = require("../models");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    const compare = await user.validatePassword(req.body.password);
    if (compare) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_STRING);
      const userInfo = await User.findOne({
        where: { email: req.body.email },
        attributes: ["id", "email", "isAdmin"],
      });
      res.status(200).json({ token: token, user: userInfo });
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials." });
  }
}

async function register(req, res) {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      },
    });
    if (created) {
      res.status(201).json({ message: "User created!" });
    } else {
      res.status(400).json({ message: "Email already exist." });
    }
  } catch (error) {
    res.status(400).json({ message: "A field is missing", error: error });
    console.log(error);

    return;
  }
}

async function index(req, res) {
  if (req.query.isAdmin === "true") {
    const adminUsers = await User.findAll({
      where: { isAdmin: true },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ users: adminUsers });
  } else if (req.query.isAdmin === "false") {
    const users = await User.findAll({
      where: { isAdmin: false },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } else {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["isAdmin", "DESC"]],
    });
    res.status(200).json(users);
  }
}

async function show(req, res) {
  const user = await User.findAll({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
}

async function destroy(req, res) {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(200).json({ message: "User deleted." });
  } else {
    res.status(400).json({ message: "User not found." });
  }
}

async function storeAdminUser(req, res) {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
      },
    });
    if (created) {
      res.status(201).json({ message: "User admin created." });
    } else {
      res.status(400).json({ message: "Email already exist." });
    }
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
}

module.exports = { login, register, index, show, destroy, storeAdminUser };
