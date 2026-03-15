import { test, expect } from "../../fixtures";

test.describe("Users API — jsonplaceholder", () => {
  test.describe("GET /users", () => {
    test("should return list of users @smoke @api", async ({ apiClient }) => {
      const users = await apiClient.getUsers();
      expect(users.length).toBeGreaterThan(0);
    });

    test("should return correct schema @regression @api", async ({
      apiClient,
    }) => {
      const users = await apiClient.getUsers();
      for (const user of users) {
        expect(user).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.stringContaining("@"),
          username: expect.any(String),
        });
      }
    });

    test("should return 10 users @regression @api", async ({ apiClient }) => {
      const users = await apiClient.getUsers();
      expect(users).toHaveLength(10);
    });
  });

  test.describe("GET /users/:id", () => {
    test("should return a single user @smoke @api", async ({ apiClient }) => {
      const user = await apiClient.getUserById(1);
      expect(user.id).toBe(1);
      expect(user.email).toBeTruthy();
    });

    test("should have all required fields @regression @api", async ({
      apiClient,
    }) => {
      const user = await apiClient.getUserById(1);
      expect(user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        username: expect.any(String),
        email: expect.stringContaining("@"),
        phone: expect.any(String),
        website: expect.any(String),
      });
    });
  });

  test.describe("POST /users", () => {
    test("should create a user @smoke @api", async ({
      apiClient,
      testData,
    }) => {
      const payload = {
        name: "John QA",
        username: "johnqa",
        email: "john@qa.com",
      };
      const created = await apiClient.createUser(payload);
      expect(created.id).toBeTruthy();
      expect(created.name).toBe(payload.name);
    });
  });

  test.describe("PUT /users/:id", () => {
    test("should update a user @regression @api", async ({ apiClient }) => {
      const payload = { name: "Updated Name", username: "updateduser" };
      const updated = await apiClient.updateUser(1, payload);
      expect(updated.name).toBe(payload.name);
    });
  });

  test.describe("DELETE /users/:id", () => {
    test("should respond with 200 @smoke @api", async ({ apiClient }) => {
      await apiClient.deleteUser(1);
    });
  });
});
