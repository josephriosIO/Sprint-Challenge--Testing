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

module.exports = router;
