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
    describe("POST ENDPOINT", () => {});
  });
});
