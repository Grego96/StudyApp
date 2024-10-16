const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController");
const { expressjwt: jwt } = require("express-jwt");

const verifyJwt = jwt({
  secret: process.env.JWT_SECRET_STRING,
  algorithms: ["HS256"],
});

const adminUserAccess = require("../middlewares/adminUserAccess");

routes.post("/login", userController.login);
routes.post("/register", userController.register);

routes.get("/users", verifyJwt, adminUserAccess, userController.index);
routes.get("/users/:id", verifyJwt, adminUserAccess, userController.show);

routes.post(
  "/users/registerAdm",
  verifyJwt,
  adminUserAccess,
  userController.storeAdminUser
);

routes.delete("/user/:id", verifyJwt, adminUserAccess, userController.destroy);

module.exports = routes;
