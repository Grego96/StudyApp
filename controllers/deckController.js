const { Deck } = require("../models");

async function index(req, res) {
  const decks = Deck.findAll({
    where: { userId: req.auth.id },
  });
  res.status(200).json(decks);
}

module.exports = { index };
