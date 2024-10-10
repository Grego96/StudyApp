const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    dialectModule: require("pg"),
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);
const User = require("./User")(sequelize, Model, DataTypes);
const Deck = require("./Deck")(sequelize, Model, DataTypes);
const Card = require("./Card")(sequelize, Model, DataTypes);

User.hasMany(Deck);
Deck.belongsTo(User);
Deck.hasMany(Card);
Card.belongsTo(Deck);

module.exports = { sequelize, User, Deck, Card };
