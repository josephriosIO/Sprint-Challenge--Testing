const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("./server");

describe("Server.js", () => {
  describe("GET /", () => {
    it("makes sure server is running correctly", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
    });
  });
  describe("gamesRouter.js", () => {
    afterEach(async () => {
      await db("games").truncate();
    });
    describe("GET ENDPOINT", () => {
      it("receives a 200 status code when recieving right data", async () => {
        const res = await request(server).get("/api/games");
        expect(res.status).toBe(200);
      });
      it("it should return application/json", async () => {
        const res = await request(server).get("/api/games");
        expect(res.type).toBe("application/json");
      });
      it("it should return empty array if no games are there", async () => {
        const res = await request(server).get("/api/games");
        expect(res.body).toHaveLength(0);
      });
    });
    describe("POST ENDPOINT", () => {
      it("should return 201 status code", async () => {
        const game = {
          title: "Pac-Man",
          genre: "Arcade",
          releaseYear: 1980
        };
        const res = await request(server)
          .post("/api/games")
          .send(game);
        expect(res.status).toBe(201);
      });
      it("should return an object with posted game", async () => {
        const game = {
          title: "Pac-Man",
          genre: "Arcade",
          releaseYear: 1980
        };
        const res = await request(server)
          .post("/api/games")
          .send(game);
        expect(res.body.title).toBe("Pac-Man");
      });
      it("should return 422 status code if a field is missing", async () => {
        const game = {
          title: "Pac-Man",
          releaseYear: 1980
        };
        const res = await request(server)
          .post("/api/games")
          .send(game);
        expect(res.status).toBe(422);
      });
      it("should return status 405 if same game is made", async () => {
        const game = {
          title: "Pac-Man",
          genre: "Arcade",
          releaseYear: 1980
        };
        let res = await request(server)
          .post("/api/games")
          .send(game);
        expect(res.status).toBe(201);
        res = await request(server)
          .post("/api/games")
          .send(game);
        expect(res.status).toBe(405);
      });
    });
  });
});
