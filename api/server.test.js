const request = require("supertest");

const server = require("./server");

describe("Server.js", () => {
  describe("GET /", () => {
    it("makes sure server is running correctly", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
    });
  });
});
