import { test, expect } from "../../fixtures";

test.describe("Todos API — jsonplaceholder", () => {

  test("GET /todos — should return 200 todos @smoke @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.get("/todos");
    expect(res.status()).toBe(200);
    const todos = await res.json();
    expect(todos).toHaveLength(200);
  });

  test("GET /todos/:id — should return a single todo @smoke @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.get("/todos/1");
    expect(res.status()).toBe(200);
    const todo = await res.json();
    expect(todo).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  test("GET /todos?userId= — should filter by user @regression @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.get("/todos", { params: { userId: "1" } });
    expect(res.status()).toBe(200);
    const todos = await res.json();
    todos.forEach((t: { userId: number }) => expect(t.userId).toBe(1));
  });

  test("POST /todos — should create a todo @regression @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.post("/todos", {
      data: { userId: 1, title: "Write more tests", completed: false },
    });
    expect(res.status()).toBe(201);
    const created = await res.json();
    expect(created.title).toBe("Write more tests");
    expect(created.id).toBeTruthy();
  });

  test("PATCH /todos/:id — should update completed status @regression @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.patch("/todos/1", {
      data: { completed: true },
    });
    expect(res.status()).toBe(200);
    const updated = await res.json();
    expect(updated.completed).toBe(true);
  });

  test("DELETE /todos/:id — should respond with 200 @smoke @api", async ({ workerApiContext }) => {
    const res = await workerApiContext.delete("/todos/1");
    expect(res.status()).toBe(200);
  });
});