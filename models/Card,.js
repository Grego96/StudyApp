module.exports = (sequelize, Model, DataTypes) => {
  class Card extends Model {}
  Card.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      adverso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
      },
      reverso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
      },
      payment_method: {
        type: DataTypes.ENUM("New", "Again", "Hard", "Good", "Easy"),
        allowNull: false,
        defaultValue: "New",
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "deck",
    }
  );

  return Deck;
};
