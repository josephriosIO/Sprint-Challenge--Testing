const Games = require("./gamesModel");
const db = require("../dbConfig");

describe("games models", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });
  describe("get()", () => {
    it("should get all games", async () => {
      const allGames = await Games.get();

      expect(allGames).toBeDefined();
    });
  });
  describe("insert()", () => {
    const game = {
      title: "Pac-Man",
      genre: "Arcade",
      releaseYear: 1980
    };
    it("should insert a game into database", async () => {
      await Games.insert(game);
      const games = await db("games");

      expect(games).toHaveLength(1);
    });
    it("should make sure correct game gets inserted", async () => {
      const game = {
        title: "Pac-Man",
        genre: "Arcade",
        releaseYear: 1980
      };
      let games = await Games.insert(game);

      expect(games.title).toBe("Pac-Man");
    });
  });
});
