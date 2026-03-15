export const createPostPayload = (overrides = {}) => ({
  userId: 1,
  title: `Test Post — ${Date.now()}`,
  body: "Created by an automated Playwright test.",
  ...overrides,
});

export const createCommentPayload = (overrides = {}) => ({
  postId: 1,
  name: "QA Engineer",
  email: "qa@example.com",
  body: "Comment created by an automated Playwright test.",
  ...overrides,
});
