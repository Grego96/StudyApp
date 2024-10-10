module.exports = (sequelize, Model, DataTypes) => {
  class Deck extends Model {}
  Deck.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
      },
      difficultyTime: {
        type: DataTypes.JSON,
        allowNull: false,
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
