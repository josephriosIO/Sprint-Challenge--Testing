const Games = require("./gamesModel");
const db = require("../dbConfig");

describe("games models", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });
  describe("GET", () => {
    it("should get all games", async () => {
      const allGames = await Games.get();

      expect(allGames).toBeDefined();
    });
  });
});
