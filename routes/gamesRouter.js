const router = require("express").Router();
const db = require("../database/helpers/gamesModel");

router.get("/", async (req, res) => {
  try {
    const allGames = await db.get();
    res.status(200).json(allGames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, genre } = req.body;
    if (!title || !genre) {
      return res
        .status(422)
        .json({ messsage: "missing a field please enter all required fields" });
    }

    if (title === null) {
      return res.status(405).json({ message: "title exists" });
    }

    const postedGame = await db.insert(req.body);
    res.status(201).json(postedGame);
  } catch (err) {
    if (req.body) {
      return res.status(405).json({ message: "title exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
