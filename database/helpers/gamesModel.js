const db = require("../dbConfig.js");

module.exports = {
  get,
  insert,
  ifExists
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

function ifExists(id) {
  return db("games").whereExists(function() {
    this.select("*")
      .from("games")
      .whereRaw(`games.id = ${id}`);
  });
}
