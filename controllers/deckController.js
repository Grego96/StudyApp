const { Deck } = require("../models");

async function index(req, res) {
  const decks = await Deck.findAll({
    where: { userId: req.auth.id },
  });
  res.status(200).json(decks);
}

async function show(req, res) {
  const deck = await Deck.findByPk(req.params.id);
  if (deck) {
    res.status(200).json(deck);
  } else {
    res.status(404).json({ message: "deck not found" });
  }
}

async function store(req, res) {
  try {
    const deck = await Deck.create({
      userId: req.auth.id,
      name: req.body.name,
      difficultyTime: {},
    });
    res.status(201).json({ message: "Deck created!" });
  } catch (error) {
    res.status(404).json({ message: "Missing information", error: error });
  }
}

// async function edit(req, res) {
//   const deck = await Deck.findByPk(req.params.id);
//   if (deck) {
//     await deck.update({ status: req.body. });
//     res.status(200).json({ message: " updated." });
//   } else {
//     res.status(404).json({ message: "Error" });
//   }
// }

async function destroy(req, res) {
  const deck = await Deck.findByPk(req.params.id);
  if (deck) {
    await deck.destroy();
    res.status(200).json({ message: "Deck deleted." });
  } else {
    res.status(400).json({ message: "Deck not found." });
  }
}
module.exports = { index, show, store, destroy };
