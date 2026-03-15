import { test, expect } from "../../fixtures";
import { createPostPayload } from "../../test-data/api.data";
import type { Post, Comment } from "../../types";

test.describe("Posts API — jsonplaceholder", () => {
  test("GET /posts — should return 100 posts @smoke @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/posts");
    expect(res.status()).toBe(200);
    const posts: Post[] = await res.json();
    expect(posts).toHaveLength(100);
  });

  test("GET /posts/:id — should return a single post @smoke @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/posts/1");
    expect(res.status()).toBe(200);
    const post: Post = await res.json();
    expect(post).toMatchObject({ id: 1, userId: expect.any(Number) });
  });

  test("GET /posts/9999 — should return 404 @regression @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/posts/9999");
    expect(res.status()).toBe(404);
  });

  test("POST /posts — should create a post @regression @api", async ({
    workerApiContext,
  }) => {
    const payload = createPostPayload();
    const res = await workerApiContext.post("/posts", { data: payload });
    expect(res.status()).toBe(201);
    const created: Post = await res.json();
    expect(created.title).toBe(payload.title);
    expect(created.id).toBeTruthy();
  });

  test("DELETE /posts/:id — should respond 200 @regression @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.delete("/posts/1");
    expect(res.status()).toBe(200);
  });

  test("GET /posts/1/comments — should return comments @smoke @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/posts/1/comments");
    expect(res.status()).toBe(200);
    const comments: Comment[] = await res.json();
    expect(comments.length).toBeGreaterThan(0);
  });

  test("GET /comments?postId= — should filter by post @regression @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/comments", {
      params: { postId: "2" },
    });
    const comments: Comment[] = await res.json();
    comments.forEach((c) => expect(c.postId).toBe(2));
  });

  test("comment schema should be valid @regression @api", async ({
    workerApiContext,
  }) => {
    const res = await workerApiContext.get("/comments/1");
    const comment: Comment = await res.json();
    expect(comment).toMatchObject({
      postId: expect.any(Number),
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      body: expect.any(String),
    });
  });
});
