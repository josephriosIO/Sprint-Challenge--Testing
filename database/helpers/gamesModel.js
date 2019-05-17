const db = require("../dbConfig.js");

module.exports = {
  get,
  insert
};

async function insert(game) {
  const [id] = await db("games").insert(game);

  return findById(id);
}

function get() {
  return db("games");
}
function findById(id) {
  return db("games")
    .where({ id })
    .first();
}
