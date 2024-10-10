const userRoutes = require("./usersRoutes");

module.exports = (app) => {
  app.use(userRoutes);
};
